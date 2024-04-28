<script>
export default {
  data() {
    return {
      name: 'Forecasting Floods, Safeguarding Futures.',
      message: 'I like apples'
    }
  }
};
</script>

<template>
  <div>
    <img
        style="z-index: -3; width: 100%; opacity:0.5; position: absolute; top: 10vh; left:0; min-width: 100vh; min-height: 1000px"
        src="/e135931e-e775-49cd-9768-ac9e74cfe684.png">

    <div
        style="flex-direction: column; justify-content: center; align-items: center; text-align: center">
      <img id="mainLogo" src="/sayllogo-removebg.png" alt="Your Logo"
           style="width: 55rem; margin-bottom: 5rem; max-width: 90%"/>
      <p id="slogan" style="margin-bottom: 70px; font-family: 'Bubblegum Sans'; color: #304564;">Forecasting Floods,
        Safeguarding Futures.</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; ">
      <div class="flood-info">
        <h2 style="font-family: Fira Mono, Monospace;">Floods</h2>
        <p style="margin-bottom: 10px; font-family: Fira Mono, Monospace;">Floods are a natural disaster caused by the
          overflowing of water onto land that is normally dry. They can be incredibly destructive, leading to loss of
          life, property damage, and environmental disruption.</p>
      </div>
      <div class="Causes-info">

        <h2 style="font-family: Fira Mono, Monospace;">Causes of Flood</h2>
        <ul style="margin-bottom: 10px;">
          <li style="font-family: Fira Mono, Monospace;">Heavy Rainfall: This is the most common cause of floods.</li>
          <li style="font-family: Fira Mono, Monospace;">Storm Surge: Coastal areas are particularly susceptible to
            flooding due to storm surges.
          </li>
          <li style="font-family: Fira Mono, Monospace;">Rising Sea Level: Rising sea level due to climate change is
            gradually increasing the baseline water level in coastal areas.
          </li>
        </ul>
      </div>
      <div class="Features-info">
        <h2 style="font-family: Fira Mono, Monospace;">Features</h2>
        <p style="font-family: Fira Mono, Monospace;">Flood forecasting is the process of predicting the occurrence,
          magnitude, timing, and duration of floods in a specific area, often by analysing various hydrological,
          meteorological, and environmental factors using Quantum Computer. The primary goal of flood prediction is to
          deliver timely and accurate information to decision-makers, empowering them to take appropriate actions to
          mitigate the potential consequences of flooding on human lives, property, and the environment. </p>
      </div>


    </div>

  </div>
</template>

<style scoped>
@media screen and (min-width: 320px) {
  #mainLogo {
    margin-top: 5rem;
  }

  #slogan {
    font-size: 3rem;
    -webkit-text-stroke: 1px white;
    margin-top: -3rem
  }
}

@media screen and (min-width: 768px) {
  #mainLogo {
    margin-top: 0;
  }

  #slogan {
    font-size: 5rem;
    -webkit-text-stroke: 2px white;
    margin-top: -7rem
  }

}

.flood-info {
  border: 1px solid #ddd; /* Add a border */
  padding: 20px; /* Add some space inside the box */
  margin: 10px; /* Add margin around the box */
  background-color: #f5f5f5; /* Optional background color */
  width: 60rem; /* Set your desired maximum width */
  max-width: 90%;
  border-radius: 5px; /* Add rounded corners */
}

.Causes-info {
  border: 1px solid #ddd; /* Add a border */
  padding: 20px; /* Add some space inside the box */
  margin: 10px; /* Add margin around the box */
  background-color: #f5f5f5; /* Optional background color */
  width: 60rem; /* Set your desired maximum width */
  max-width: 90%;
  border-radius: 5px; /* Add rounded corners */
}

.Features-info {
  border: 1px solid #ddd; /* Add a border */
  padding: 20px; /* Add some space inside the box */
  background-color: #f5f5f5; /* Optional background color */
  width: 60rem; /* Set your desired maximum width */
  max-width: 90%;
  border-radius: 5px; /* Add rounded corners */
}
</style>