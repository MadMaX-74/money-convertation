<template>
  <div class="card">
    <h1 class="card__title">Узнать курс обмена валют</h1>
    <CurrencyForm />
    <MoneyResulComponent />
  </div>
</template>

<script>
import CurrencyForm from "@/components/CurrencyForm";
import MoneyResulComponent from "@/components/MoneyResulComponent";


export default {
    components: {CurrencyForm, MoneyResulComponent}
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app, body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  background-color: #061733;
  display: block;
  padding-top: 40px;
}
.card{
  background-color: #fff;
  width: 80%;
  margin: 0 auto;
  border-radius: 12px;
  border:none;
  padding: 40px;
  &__title{
    text-transform: uppercase;
  }

}


</style>
