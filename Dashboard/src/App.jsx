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
import AddPlan from "./OtherPages/addPlan";
import ViewAllPlan from "./OtherPages/ViewAllPlan";
import EditPlan from "./OtherPages/EditPlan";
import CompletedOrders from "./OtherPages/CompletedOrders";
import CancelledOrders from "./OtherPages/CancelledOrders";
import TotalOrders from "./OtherPages/TotalOrders";
import AdminLogin from "./Pages/AdminLogin";
import ProtectedRoute from "./OtherPages/ProtectedRoute";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={ <ProtectedRoute> <Layout /> </ProtectedRoute> }>
          <Route index element={<Dashboard />} />
          <Route path="member" element={<Member />} />
          <Route path="sales" element={<Sales />} />
          <Route path="plan" element={<Plan />} />
          <Route path="expance" element={<Expance />} />
          <Route path="blog" element={<Blog />} />
          <Route path="canteen" element={<Canteen />} />

          <Route path="memberdetails" element={<MemberDetails />} />
          <Route path="last7days" element={<OnBoardingOnLast7days />} />
          <Route path="addexpance" element={<AddExpense />} />
          <Route path="viewallexpence" element={<ViewAllExpenses />} />
          <Route path="editexpence" element={<EditExpense />} />
          <Route path="viewallsales" element={<ViewAllSales />} />
          <Route
            path="viewexpireinsevendays"
            element={<ExpireIn7DaysDetails />}
          />
          <Route path="viewmemberdetails" element={<ViewDetailsMember />} />
          <Route path="addmember" element={<AddMember />} />
          <Route path="viewsaledetails" element={<ViewDetailsSale />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="cashrequest" element={<CashRequestsDashboard />} />
          <Route path="totalitem" element={<TotalItems />} />
          <Route path="additem" element={<AddItem />} />
          <Route path="edititem" element={<EditItem />} />
          <Route path="editblog" element={<EditBlog />} />
          <Route path="addPlan" element={<AddPlan />} />
          <Route path="viewAllPlan" element={<ViewAllPlan />} />
          <Route path="editPlan" element={<EditPlan />} />
          <Route path="CompletedOrders" element={<CompletedOrders />} />
          <Route path="CancelledOrders" element={<CancelledOrders />} />
          <Route path="TotalOrders" element={<TotalOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
