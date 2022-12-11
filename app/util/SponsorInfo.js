var moment = require('moment');

class SponsorInfo {
    constructor(data, id,tinfo) {
        this.data = data;

        this.childrencount = 0;
        this.children = [];
        this.childrenMap = {};
        this.id = id;
        this.addablesponsorid = id;
        this.addableposition = 0;

        this.maxdepth = 0;
        this.sumBalance = 0;

        this.tinfo = tinfo;

        if(tinfo != undefined)
        {
            this.sumWeekBalance = 0;
            this.weeknumber = moment(tinfo, "YYYY-MM-DD").isoWeek();
        }
       // this.getChilden(id, 1);
    }

    async getChilden(id, depth) {
        let temp = [];
        let siblingIndex = 0;

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].parentSponsorId == id) {
                temp.push(this.data[i]);

                if(this.tinfo != undefined)
                {
                    if(this.data[i].buytype === 'new')
                    {
                        var tempweeknumber = moment(this.data[i].regdate, "YYYY-MM-DD").isoWeek();

                        if(tempweeknumber === this.weeknumber)
                        {
                            this.sumWeekBalance = this.sumWeekBalance + this.data[i].balance
                        }
                    }
                }

                this.sumBalance = this.sumBalance + this.data[i].balance
                this.children.push({
                    siblingIndex: siblingIndex,
                    depth: depth,
                    data: this.data[i],
                });
                siblingIndex++;
            }
        }

        if (temp.length > 0) {

            // 30 대를 까지만 구성할수 있도록 함. 
            if(depth>30) return 

            depth++;
            for (let j = 0; j < temp.length; j++) {
                this.childrencount++;

                this.getChilden(temp[j].id, depth);
            }
        } else {
            return;
        }
    }

    getChildInfoByDepth(depth) {
        let rtnArr = [];
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].depth == depth) {
                rtnArr.push(this.children[i].data);
            }
        }

        if(rtnArr.length >0 ) this.maxdepth = depth;

        return { length: rtnArr.length, data: rtnArr };
    }

    async getChildenCount() {
        return this.children.length;
    }

    // depth 별 정보 가져오기

    async getSponsorInfo() {
        //console.log('---------getSponsorInfo -------------')
       
        for (let i = 1; i < 31; i++) {
            let arrDepth = this.getChildInfoByDepth(i);
            this.childrenMap[i] = arrDepth;
        }

        var tempSumWeekBalance = 0

        if(this.tinfo != undefined)
        {
            tempSumWeekBalance = this.sumWeekBalance
        }

        return {
            length: this.children.length,
            maxdepth: this.maxdepth,
            sumBalance: this.sumBalance,
            sumWeekBalance : tempSumWeekBalance,
            children: this.children,
            data: this.childrenMap,

        };
    }
}

module.exports = SponsorInfo;
