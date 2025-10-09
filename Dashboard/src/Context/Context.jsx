import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRef } from "react";
import orderNotification from "../assets/notification_tone.mp3";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [TotalMember, setTotalMember] = useState();
  const [TotalSales, setTotalSales] = useState();
  const [TotalExpence, setTotalExpence] = useState();
  const [MonthlySale, setMonthlySale] = useState([]);
  const [ExpringIn7Days, setExpringIn7Days] = useState();
  const [MemberInfo, setMemberInfo] = useState([]);
  const [OnboaringOnLast7Days, setOnboaringOnLast7Days] = useState([]);
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    description: "",
  });

  const [MontlyWiseEXpance, setMontlyWiseEXpance] = useState([]);
  const [GetAllExpance, setGetAllExpance] = useState([]);
  const [MonthlyDataForSaleGraph, setMonthlyDataForSaleGraph] = useState([]);
  const [TotalSalesWithDiscription, setTotalSalesWithDiscription] = useState(
    []
  );
  const [ExpireIn7DaysDetails, setExpireIn7DaysDetails] = useState([]);
  const [TotalPlan, setTotalPlan] = useState([]);
  const [TotalRecentPlan, setRecentPlan] = useState([]);
  const [TotalPlanForGraph, setTotalPlanForGraph] = useState([]);
  const [members, setMembers] = useState([]);
  const [blog, setBlog] = useState([]);
  const [Attendance, setAttendance] = useState([]);
  const [AttendanceRushData, setAttendanceRushData] = useState([]);
  const [getTotalItem, setgetTotalItems] = useState([]);
  const [getAllCompletedOrder, setgetAllCompletedOrder] = useState([]);
  const [getAllCancelledOrder, setgetAllCancelledOrder] = useState([]);
  const [getAllPlan, setgetAllPlan] = useState([]);
  const [getTotalOrder, setgetTotalOrder] = useState([]);
  const [getAllCashRegisterRequest, setgetAllCashRegisterRequest] = useState(
    []
  );

  const [orders, setOrders] = useState([]);
  const audioRef = useRef(new Audio(orderNotification));
  const prevOrderIdsRef = useRef(new Set());

  // Context.js

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/all`
      );

      if (res.data.success) {
        const newOrders = res.data.data;
        const newOrderIds = newOrders.map((order) => order._id);

        // Find newly received orders
        const newlyReceivedOrders = newOrders.filter(
          (order) => !prevOrderIdsRef.current.has(order._id)
        );

        if (newlyReceivedOrders.length > 0) {
          audioRef.current.play();
          toast.success(
            `New order${newlyReceivedOrders.length > 1 ? "s" : ""} received!`
          );
        }

        prevOrderIdsRef.current = new Set(newOrderIds);
        setOrders(newOrders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching orders");
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch immediately on mount

    const interval = setInterval(() => {}, 2000); // Every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const updateMemberInContext = (updatedMember) => {
    setMemberInfo((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m._id === updatedMember._id ? updatedMember : m
      ),
    }));
  };

  const deleteMemberFromContext = (id) => {
    setMemberInfo((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m._id !== id),
    }));
  };

  const updateMember = async (id, data) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/member/update/${id}`,
        data
      );
      updateMemberInContext(res.data); // <--- update context here
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMember = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/member/delete/${id}`
      );
      deleteMemberFromContext(id); // <--- update context here
    } catch (err) {
      console.log(err);
    }
  };

  // MonthlyDataForSaleGraph For real Sales Graph on sales Section
  const monthlySalesGraph = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/sales-graph`
      );
      setMonthlyDataForSaleGraph(data.data.monthlyData);
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL Sales API
  const fetchTotalSales = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/total-sales`
      );
      setTotalSales(data.data.totalSales);

      setMonthlySale(data.data.monthlyData);
    } catch (error) {
      console.log(error);
    }
  };

  // ExpringIn7Days
  const fetchExpringIn7Days = async () => {
    try {
      const data = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/dashboard/getTotalExpiringPlans`
      );
      setExpringIn7Days(data.data.totalExpiring);
      setExpireIn7DaysDetails(data.data.members);
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL MEMBER API
  const fetchTotalMember = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/all-members`
      );
      setTotalMember(data.data.data.membersCount);

      setMemberInfo(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL ALL  EXPENCE  LIST  API
  const fetchAllExpence = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/expense/getAllExpense`
      );

      setGetAllExpance(data.data.data.AllExpense);
    } catch (error) {
      console.log(error);
    }
  };

  // GET TOTAL EXPANCE
  const fetchTotalExpence = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/getTotalExpense`
      );

      setTotalExpence(data.data.totalExpense);
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL MEMEBER WHOS ONBOARING ON LAST 7 DAYS
  const fetchOnboaringOnLast7Days = async () => {
    try {
      const data = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/dashboard/on-board-onlast-seven-days`
      );
      setOnboaringOnLast7Days(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMonthlyWiseExpance = async () => {
    try {
      const data = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/expense/get-monthlywise-expence`
      );

      setMontlyWiseEXpance(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalSaleWithDiscription = async () => {
    try {
      const data = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/dashboard/total-sales-with-discription`
      );

      setTotalSalesWithDiscription(data.data.salesData);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPlan = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/plan/all`
      );

      setTotalPlan(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const recentPlan = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/plan/top-plan`
      );

      setRecentPlan(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPlanForGraph = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/plan/getallplanforplangraph`
      );

      setTotalPlanForGraph(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBlogs = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/getAllBlog`
      );

      setBlog(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAttendance = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance/getAttendanceByDate`
      );

      setAttendance(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAttendanceRushData = async () => {
    try {
      const data = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/attendance/getAllAttendanceRush`
      );

      setAttendanceRushData(data.data.rushData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalItems = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/canteen/getall`
      );

      setgetTotalItems(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fatchAllCompletedOrder = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/completed`
      );

      setgetAllCompletedOrder(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fatchAllCancelledOrder = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/cancelled`
      );

      setgetAllCancelledOrder(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fatchTotalOrder = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/total`
      );

      setgetTotalOrder(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fatchAllPlan = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/plan/all`
      );

      setgetAllPlan(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fatchAllRegisterRequest = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cashregister/all`
      );

      setgetAllCashRegisterRequest(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTotalMember();
    fetchTotalSales();
    fetchExpringIn7Days();
    fetchOnboaringOnLast7Days();
    getMonthlyWiseExpance();
    fetchTotalExpence();
    fetchAllExpence();
    monthlySalesGraph();
    totalSaleWithDiscription();
    totalPlan();
    recentPlan();
    totalPlanForGraph();
    getAllBlogs();
    getAllAttendance();
    getAllAttendanceRushData();
    getTotalItems();
    fatchAllCompletedOrder();
    fatchAllCancelledOrder();
    fetchOrders();
    fatchAllPlan();
    fatchTotalOrder();
    fatchAllRegisterRequest();
  }, []);

  const refreshTotalExpense = () => {
    fetchTotalExpence();
    fetchAllExpence();
    getMonthlyWiseExpance();
  };

  const refreshCashRegisterRequest = () => {
    fatchAllRegisterRequest();
  };

  const refreshCanteen = () => {
    getTotalItems();
  };

  const refreshBlog = () => {
    getAllBlogs();
  };

  const refreshPlan = () => {
    fatchAllPlan();
  };

  const refreshOrder = () => {
    fatchAllCancelledOrder();
    fatchAllCompletedOrder();
    fatchTotalOrder();
    fetchOrders();
  };

  return (
    <Context.Provider
      value={{
        TotalMember,
        TotalSales,
        TotalExpence,
        MonthlySale,
        ExpringIn7Days,
        MemberInfo,
        OnboaringOnLast7Days,
        expense,
        setExpense,
        refreshTotalExpense,
        MontlyWiseEXpance,
        GetAllExpance,
        MonthlyDataForSaleGraph,
        TotalSalesWithDiscription,
        ExpireIn7DaysDetails,
        TotalPlan,
        TotalRecentPlan,
        TotalPlanForGraph,
        members,
        setMembers,
        updateMember,
        deleteMember,
        blog,
        Attendance,
        AttendanceRushData,
        getTotalItem,
        refreshCanteen,
        getAllCompletedOrder,
        getAllCancelledOrder,
        refreshOrder,
        orders,
        audioRef,
        prevOrderIdsRef,
        refreshBlog,
        getAllPlan,
        refreshPlan,
        getTotalOrder,
        getAllCashRegisterRequest,
        refreshCashRegisterRequest,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom hook to use dashboard context
export const useDashboardContext = () => useContext(Context);
