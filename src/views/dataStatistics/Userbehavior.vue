<template>
    <div class="Userbehavior">
        <ul>
            <li>
                <UserbehaviorSell></UserbehaviorSell>
            </li>
            <li>
                <Userbehaviorlease></Userbehaviorlease>
            </li>
        </ul>
    </div>
</template>
<script>
    import UserbehaviorSell from './Userbehavior_Sell'
    import Userbehaviorlease from './Userbehavior_lease'
    export default{
        data(){
            return {

            }
        },
        components:{
            UserbehaviorSell,
            Userbehaviorlease
        }
    }
</script>