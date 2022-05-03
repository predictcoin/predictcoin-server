import CroSportOracleController from "./application/controllers/CroSportOracle";
import {sportOracleContract} from "./application/insfrastructure/CroContracts"

const sportsController = new CroSportOracleController(sportOracleContract)

const CroSportsOracle = () => {
  // schedule add sports events
  sportsController.scheduleAddEvent();

  // watch sport events
}



export default CroSportsOracle;