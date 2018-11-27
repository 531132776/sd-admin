
// 过滤器

const paymentF = (idx)=>{ // 支付方式
    var arr = ['未付款','线上支付','线下支付','钱包支付'];
    return arr[idx]
}

const payStatusF = (idx)=>{ //支付状态
    var arr = ['待付款','已支付','财务已审核（待确认线上合同）','已确认线上合同','线下合同派单','已签署合同','已完成','账务审核不通过'];
    return arr[idx]
}

const orderTypeF = (idx) =>{
    var arr = ['出租','出售'];
    return arr[idx];
}

const tradingStatusF = (idx) =>{ //交易状态
    var arr = ['交易中','交易成功','交易失败'];
    return arr[idx];
}

const refundF = (idx) =>{ //退款状态
    var arr = ['未退款','已退款'];
    return arr [idx];
}

// 订单状态
const orderStatusF0 = (idx)=>{ //订单状态 - 出租
    var arr = ['待付款','已支付','财务已审核（待确认线上合同）','已确认线上合同','线下合同派单','已签署合同','确认Ejari合同签订'];
    return arr[idx]
}

const orderStatusF1 = (idx)=>{ //订单状态 - 出售
    var arr = ['待付款','已支付','财务已审核（待确认线上合同）','已确认线上合同','线下合同派单','已签署合同','卖家NOC /买家贷款','完成产权变更','已完成','买家拒绝签正式合同','业主拒绝签正式合同','账务审核不通过','申请退款','已退款'];
    return arr[idx]
}
const boothTypeF=(boothType)=>{
    var arr=['广告','买家出租问题' ,'买家出售问题','卖家出租问题','卖家出售问题','友情链接','出租','出售','新楼盘'];
    return arr[boothType]
}
const articleTypeF=(articleType)=>{
    var arr=['买家租房','买家买房','卖家出租','卖家出售','首页FAQ'];
    return arr[articleType]
}
const articleStatusF=(articleStatus)=>{
    var arr=['未启用','启用','删除','修改中' ,'默认为'];
    return arr[articleStatus]
}


const progressF = (idx)=>{
    var obj = {
        101:'上传房源',
        102:'发布房源',
        103:'线上议价成交',
        104:'合同签订',
        105:'ejari注册',
        114:'合同签订(FromF)',
        115:'卖家NOC/买家贷款',
        116:'产权变更',
        21:'预约看房'
    }
    return obj[idx]
}

export default{
    paymentF,
    payStatusF,
    orderTypeF,
    tradingStatusF,
    refundF,
    orderStatusF0,
    orderStatusF1,
    boothTypeF,
    articleTypeF,
    articleStatusF
}
