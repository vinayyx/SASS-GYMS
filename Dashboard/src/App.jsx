import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import Member from "./Pages/Member";
import Sales from "./Pages/Sales";
import Plan from "./Pages/Plan";
import Expance from "./Pages/Expance";
import Blog from "./Pages/Blog";
import MemberDetails from "./OtherPages/MemberDetails";
import OnBoardingOnLast7days from "./OtherPages/OnBoardingOnLast7days";
import AddExpense from "./OtherPages/AddExpance";
import ViewAllExpenses from "./OtherPages/ViewAllExpenses";
import EditExpense from "./OtherPages/EditExpense";
import ViewAllSales from "./OtherPages/ViewAllSales";
import ExpireIn7DaysDetails from "./OtherPages/ExpireIn7DaysDetails";
import ViewDetailsMember from "./OtherPages/ViewDetailsMember ";
import AddMember from "./OtherPages/AddMember";
import ViewDetailsSale from "./OtherPages/ViewDetailsSale";
import AddBlog from "./OtherPages/AddBlog";
import CashRequestsDashboard from "./OtherPages/CashRequestsDashboard";
import Canteen from "./Pages/Canteen";
import TotalItems from "./OtherPages/TotalItems";
import AddItem from "./OtherPages/AddItem";
import EditItem from "./OtherPages/EditItem";
import EditBlog from "./OtherPages/EditBlog";
import AddPlan from "./OtherPages/AddPlan";
import ViewAllPlan from "./OtherPages/ViewAllPlan";
import EditPlan from "./OtherPages/EditPlan";
import CompletedOrders from "./OtherPages/CompletedOrders";
import CancelledOrders from "./OtherPages/CancelledOrders";
import TotalOrders from "./OtherPages/TotalOrders";
import AdminLogin from "./Pages/AdminLogin";
import ProtectedRoute from "./OtherPages/ProtectedRoute";
import Home from "./Pages/Home";
import GymProfile from "./Pages/GymProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/api"
          element={
            <ProtectedRoute>
              {" "}
              <Layout />{" "}
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/api/member" element={<Member />} />
          <Route path="/api/sales" element={<Sales />} />
          <Route path="/api/plan" element={<Plan />} />
          <Route path="/api/expance" element={<Expance />} />
          <Route path="/api/blog" element={<Blog />} />
          <Route path="/api/canteen" element={<Canteen />} />

          <Route path="/api/memberdetails" element={<MemberDetails />} />
          <Route path="/api/last7days" element={<OnBoardingOnLast7days />} />
          <Route path="/api/addexpance" element={<AddExpense />} />
          <Route path="/api/viewallexpence" element={<ViewAllExpenses />} />
          <Route path="/api/editexpence" element={<EditExpense />} />
          <Route path="/api/viewallsales" element={<ViewAllSales />} />
          <Route
            path="/api/viewexpireinsevendays"
            element={<ExpireIn7DaysDetails />}
          />
          <Route path="/api/viewmemberdetails" element={<ViewDetailsMember />} />
          <Route path="/api/addmember" element={<AddMember />} />
          <Route path="/api/viewsaledetails" element={<ViewDetailsSale />} />
          <Route path="/api/addblog" element={<AddBlog />} />
          <Route path="/api/cashrequest" element={<CashRequestsDashboard />} />
          <Route path="/api/totalitem" element={<TotalItems />} />
          <Route path="/api/additem" element={<AddItem />} />
          <Route path="/api/edititem" element={<EditItem />} />
          <Route path="/api/editblog" element={<EditBlog />} />
          <Route path="/api/addPlan" element={<AddPlan />} />
          <Route path="/api/viewAllPlan" element={<ViewAllPlan />} />
          <Route path="/api/editPlan" element={<EditPlan />} />
          <Route path="/api/CompletedOrders" element={<CompletedOrders />} />
          <Route path="/api/CancelledOrders" element={<CancelledOrders />} />
          <Route path="/api/TotalOrders" element={<TotalOrders />} />
          <Route path="/api/gymProfile" element={<GymProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
