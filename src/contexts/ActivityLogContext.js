'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useUser } from "./UserContext";

const ActivityLogContext = createContext();

export const ActivityLogProvider = ({ children }) => {
  const { user } = useUser(); // Access user and token from UserContext
  const [activityLogs, setActivityLogs] = useState([]);

  // Fetch all activity logs for the logged-in user
  const fetchActivityLogs = async () => {
    if (!user) return; // Only fetch if user is logged in

    try {
      const response = await axiosInstance.get(`/user/activity-log/${user.id}`);
      setActivityLogs(response.data);
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
    }
  };

  // Add a new activity log for the logged-in user
  const addActivityLog = async (newLog) => {
    if (!user) return; // Only add if user is logged in

    try {
      const response = await axiosInstance.post("/user/activity-log", newLog);
      setActivityLogs((prevLogs) => [...prevLogs, response.data]);
    } catch (error) {
      console.error("Failed to save activity log:", error);
    }
  };

  // Remove an activity log for the logged-in user
  const removeActivityLog = async (logId) => {
    if (!user) return; // Only remove if user is logged in

    try {
      await axiosInstance.delete(`/user/activity-log/${logId}`);
      // Update the state to remove the log locally
      setActivityLogs((prevLogs) =>
        prevLogs.filter((log) => log._id !== logId)
      );
    } catch (error) {
      console.error("Failed to remove activity log:", error);
    }
  };

  // Fetch logs when the component mounts or when the user changes
  useEffect(() => {
    fetchActivityLogs();
  }, [user]);

  return (
    <ActivityLogContext.Provider
      value={{ fetchActivityLogs, activityLogs, addActivityLog, removeActivityLog }}
    >
      {children}
    </ActivityLogContext.Provider>
  );
};

export const useActivityLog = () => {
  return useContext(ActivityLogContext);
};
