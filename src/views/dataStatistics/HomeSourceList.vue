<template>
    <div class="HomeSourceList">
        <ul>
            <li>
                <HomeSourceListSell></HomeSourceListSell>
            </li>
            <li>
                <HomeSourceListLease></HomeSourceListLease>
            </li>
        </ul>
    </div>
</template>
<script>
    import HomeSourceListSell from './HomeSourceList_Sell'
    import HomeSourceListLease from './HomeSourceList_lease'
    export default{
        data(){
            return{

            }
        },
        components:{
            HomeSourceListSell,
            HomeSourceListLease
        }
    }
</script>