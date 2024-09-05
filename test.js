
var tdata = [
    {
        brand: {
            id:'3232',
            name: 'test one'
        },
        brand_type : {
                id:"22332323",
                name:'assfass'
        }
    },

    {
        brand: {
            id:'44545',
            name: 'test two'
        },
        brand_type : {
                id:"2145",
                name:'kasdkfs'
        }
    }
]


function config(data, path) {
    console.log(eval(data+"."+path))
}


const value = config(tdata[0], "brand.id");
