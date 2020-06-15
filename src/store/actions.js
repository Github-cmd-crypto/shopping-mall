import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 1.查找cartList数组中是否已有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            // 2.判断oldProduct是数量加一还是在cartList里面添加新的商品
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit('ADD_COUNTER', oldProduct)
                resolve('当前商品数量+1')
            } else {
                payload.count = 1
                    // state.cartList.push(payload)
                context.commit('ADD_TO_CART', payload)
                resolve('已添加新的商品')
            }
        })
    }
}
