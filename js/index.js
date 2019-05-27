refresh();
window.onresize = function(){
    setTimeout(function(){
        refresh();
    },10)
};
function refresh() {
    let deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 1200) {
        document.documentElement.style.fontSize = 1200 / 12 + "px";
    } else {
        document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
    }
}

var products = Vue.component('produ',{
    template: '<div id="products"> <my-footer></my-footer></div>',
    components: {
        "myFooter": {
            template: '#footer'
        },
    }
})
var evaluate = Vue.component('dval',{
    template: '<div id="evaluate"></div>'
})

var merchant = Vue.component('merch',{
    template: '<div id="merchant"></div>'
})

const router = new VueRouter({
    routes: [
{path: '/', component: products},
{path: '/products', component: products},
{path: '/evaluate', component: evaluate},
{path: '/merchant', component: merchant}
    ]
})



const App = new Vue({
    el: '#app',
    data: {
        msg: {},
        show: false
    },
    router,
    created(){
      fetch('resources/data.json').then(res=>res.json()).then(res=>{
          this.msg = res.seller;
          // console.log(this.msg);
      });

    },
    methods: {
        myShow(val){
            this.show = val;
        }

    },
    components: {
        "myHeader": {
            template: '#top',
            props: ['avatar','description', 'name', 'deliveryTime', 'bulletin', 'supports'],
            data(){
                return {
                    show: true
                }
            },
            methods: {
                chan(){
                    this.$emit('tempshow', this.show)
                }
            }
        },
        "moreInfo": {
            template: "#moreInfo",
            props: ['isShow', 'name', 'supports', 'bulletin', 'foodScore'],
            data(){
                return {
                    show: false
                }
            },
            methods: {
                close(){
                   this.$emit('clo', false)
                }
            },
            watch: {
                isShow(){
                    this.show = this.isShow;
                }
            },
            components: {
                "star": {
                    template: '#star',
                    props: {
                        num: {
                            type: Number,
                            default: 5
                        },
                        score: {
                            type: Number,
                            default: 4.3,
                        },
                        size: {
                            type: String,
                            default: ''
                        },
                        foodScore: {
                            type: Number
                        }
                    },
                    computed: {
                        itemClass(){
                            let arr = []
                            //计算星星个数(整数和半个)
                            let on = Math.floor(this.score)
                            let half = (this.score-on)*10
                            while (arr.length<on) {
                                arr.push('on')
                            }
                            if (half>4)arr.push('half')
                            while (arr.length<this.num) {
                                arr.push('off')
                            }
                            return arr;
                        }
                    }
}
            }

        },
        "myContent": {
            template: "#content",

        }
    },

})

