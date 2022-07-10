<template>
  <div class="result">
    <h3 v-if="!setMoney">Результат</h3>
    <div class="result-wrap" v-else>
      <h2 class="result_money">{{ setMoney }} <span class="result_currency">{{ setCurrency }}</span></h2>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
      //установка значения конвертированной валюты
      setCurrency(){
        let charCode = ''
        if(!this.$store.getters['getCurrency']){
          charCode = ''
        }else{
          charCode = this.$store.getters['getCurrency']['CharCode'] || this.$store.getters['getLocal']
        }
        return charCode
      },
    // установка значений для конвертации и отрисовка значений
      setMoney(){
        let money = 0,
            exChange = 0,
            fChange = 0,
            result
        if (this.$store.getters['getMoney']){
          money = this.$store.getters['getMoney']
          exChange = this.$store.getters['getCurrency']['Value'] || this.$store.getters['getCurrency']
          fChange = this.$store.getters['getForchange']['Value'] || this.$store.getters['getForchange']
          result = this.calcMoney(money, fChange, exChange)
        }
        return result
      }
  },
  methods:{
    // подсчет валюты (конвертация)
    calcMoney(money, forchange, exchange){
      let value = (+money*forchange)/exchange
      return value.toFixed(1)
    }
  }

}
</script>

<style lang="scss" scoped>
.result{

  display: flex;
  justify-content: center;
  align-items: center;
  h3{
    text-transform: uppercase;
  }
  &-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border-radius: 12px;
    border: 3px solid #32d16c;
  }
  &_money,
  &_currency{
    text-transform: uppercase;
  }
}

</style>