import BscSportOracleController from "./application/controllers/BscSportOracle";
import {sportOracleContract} from "./application/insfrastructure/BscContracts"

const sportsController = new BscSportOracleController(sportOracleContract)

const BscSportsOracle = () => {
  // schedule add sports events
  sportsController.scheduleAddEvent();

  // watch sport events
}



export default BscSportsOracle;