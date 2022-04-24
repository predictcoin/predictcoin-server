import CroSportOracleController from "./application/controllers/CroSportOracle"

const sportsController = new CroSportOracleController()

const CroSportsOracle = () => {
  // schedule add sports events
  sportsController.addNewEvents();

  // watch sport events
}

export default CroSportsOracle;