import * as React from "react";
import "../resources/styles/budget/budget.scss";
import AuthService from "../utils/AuthService.tsx";
import TopBar from "../components/TopBar";
import CategoriesList from "../components/CategoriesList";
import CategoryPieChart from "../components/CategoryPieChart";
import TotalPerMonth from "../components/TotalPerMonth";
import BudgetCategoryList from "../components/budget/BudgetCategoryList";
import BudgetSummary from "../components/budget/BudgetSummary";
import { connect } from "react-redux";
import consumptions from "pages/consumptions";
import {
  fetchBudget,
  fetchBudgetSummary
} from "../controllers/BudgetController.tsx";
import {
  fetchCategories
} from "../controllers/CategoriesController.tsx";
import SideBar from "../components/SideBar";

const authService = new AuthService();

class BudgetView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      budgetsByCategory: [],
      budget: 0,
      totalSpent: 0
    };
  }

  componentDidMount() {
    if (this.props.token !== null) {

      fetchBudgetSummary().then((result) => {
        this.setState({ ...this.state,
          budget: result.amount,
          totalSpent: result.totalSpent,
          budgetsByCategory: result.categoryItems });
      })
      .catch((error) => console.log("error", error));

    }
  }

  render() {
    return (
      <div id="content">
        <TopBar />
        <div className="mainContainer">
          <SideBar />
          <div className="mainContainerContent">
            <div className="budgetToolbar">
              <h1 className="containerTopBarTitle">Presupuesto</h1>
              <div className="budgetToolbarContainer">
                <div className="createBudgetButton">Nuevo Presupuesto</div>
              </div>
            </div>
            <div className="budgetSubtitle">Resumen</div>
            <BudgetSummary budget={this.state.budget} spent={this.state.totalSpent}/>
            <div className="budgetSubtitle">Presupuesto por categoria</div>
            <BudgetCategoryList
              className="budgetCategoryList"
              budgetItems={this.state.budgetsByCategory}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(BudgetView);