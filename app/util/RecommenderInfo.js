class RecommenderInfo {
    constructor(data, id) {
        this.data = data;

        this.childrencount = 0;
        this.children = [];
        this.childrenMap = {};
        this.id = id;
        this.addableid = id;
        this.addableposition = 0;

        this.maxdepth = 0;
       // this.getChilden(id, 1);
    }

    async getChilden(id, depth) {
        let temp = [];
        let siblingIndex = 0;

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].parentRecommenderId == id) {
                temp.push(this.data[i]);
                this.children.push({
                    siblingIndex: siblingIndex,
                    depth: depth,
                    data: this.data[i],
                });
                siblingIndex++;
            }
        }

        if (temp.length > 0) {
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

    async getInfo() {
        //console.log('---------getSponsorInfo -------------')
       
        for (let i = 1; i < 21; i++) {
            let arrDepth = this.getChildInfoByDepth(i);
            this.childrenMap[i] = arrDepth;
        }

        return {
            length: this.children.length,
            maxdepth: this.maxdepth,
            children: this.children,
            data: this.childrenMap,
        };
    }
}

module.exports = RecommenderInfo;
