import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        currRouteLink:''
    },
    mutations:{
        changeIndex(state,index){
            state.currRouteLink=index
        }
    }
}  
)

export default store