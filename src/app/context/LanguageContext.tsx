import React, { createContext, useContext, useState, useCallback } from "react";

type Language = "en" | "he";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  currency: string;
  formatCurrency: (amount: number) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.dashboard": { en: "Dashboard", he: "\u05DC\u05D5\u05D7 \u05D1\u05E7\u05E8\u05D4" },
  "nav.alerts": { en: "Alerts", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA" },
  "nav.actions": { en: "Action Plans", he: "\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA \u05E4\u05E2\u05D5\u05DC\u05D4" },
  "nav.forecast": { en: "Forecast", he: "\u05EA\u05D7\u05D6\u05D9\u05EA" },
  "nav.chat": { en: "AI Chat", he: "\u05E6'\u05D0\u05D8 AI" },
  "nav.hq": { en: "HQ View", he: "\u05EA\u05E6\u05D5\u05D2\u05EA \u05DE\u05D8\u05D4\"\u05DB\u05DC" },
  "nav.data": { en: "Data Management", he: "\u05E0\u05D9\u05D4\u05D5\u05DC \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD" },
  "nav.settings": { en: "Settings", he: "\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA" },
  // Dashboard
  "dash.title": { en: "Operations Dashboard", he: "\u05DC\u05D5\u05D7 \u05EA\u05E4\u05E2\u05D5\u05DC" },
  "dash.revenue": { en: "Revenue", he: "\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA" },
  "dash.foodCost": { en: "Food Cost", he: "\u05E2\u05DC\u05D5\u05EA \u05DE\u05D6\u05D5\u05DF" },
  "dash.laborCost": { en: "Labor Cost", he: "\u05E2\u05DC\u05D5\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4" },
  "dash.waste": { en: "Waste", he: "\u05E4\u05D7\u05EA" },
  "dash.profit": { en: "Profit Margin", he: "\u05E9\u05D5\u05DC\u05D9 \u05E8\u05D5\u05D5\u05D7" },
  "dash.aiInsights": { en: "AI Insights", he: "\u05EA\u05D5\u05D1\u05E0\u05D5\u05EA AI" },
  "dash.vsLastWeek": { en: "vs last week", he: "\u05DC\u05E2\u05D5\u05DE\u05EA \u05E9\u05D1\u05D5\u05E2 \u05E9\u05E2\u05D1\u05E8" },
  "dash.revenueByCategory": { en: "Revenue by Category", he: "\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA \u05DC\u05E4\u05D9 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4" },
  "dash.dailyTrend": { en: "Daily Revenue Trend", he: "\u05DE\u05D2\u05DE\u05EA \u05D4\u05DB\u05E0\u05E1\u05D5\u05EA \u05D9\u05D5\u05DE\u05D9\u05EA" },
  "dash.costBreakdown": { en: "Cost Breakdown", he: "\u05E4\u05D9\u05E8\u05D5\u05D8 \u05E2\u05DC\u05D5\u05D9\u05D5\u05EA" },
  "dash.today": { en: "Today", he: "\u05D4\u05D9\u05D5\u05DD" },
  "dash.thisWeek": { en: "This Week", he: "\u05D4\u05E9\u05D1\u05D5\u05E2" },
  "dash.thisMonth": { en: "This Month", he: "\u05D4\u05D7\u05D5\u05D3\u05E9" },
  "dash.custom": { en: "Custom", he: "\u05DE\u05D5\u05EA\u05D0\u05DD \u05D0\u05D9\u05E9\u05D9" },
  "dash.lastUpdated": { en: "Last updated", he: "\u05E2\u05D3\u05DB\u05D5\u05DF \u05D0\u05D7\u05E8\u05D5\u05DF" },
  "dash.noInsights": { en: "No new insights. All caught up!", he: "\u05D0\u05D9\u05DF \u05EA\u05D5\u05D1\u05E0\u05D5\u05EA \u05D7\u05D3\u05E9\u05D5\u05EA. \u05D4\u05DB\u05DC \u05DE\u05E2\u05D5\u05D3\u05DB\u05DF!" },
  "dash.new": { en: "new", he: "\u05D7\u05D3\u05E9" },
  "dash.thisWeekLabel": { en: "This Week", he: "\u05D4\u05E9\u05D1\u05D5\u05E2" },
  "dash.lastWeekLabel": { en: "Last Week", he: "\u05E9\u05D1\u05D5\u05E2 \u05E9\u05E2\u05D1\u05E8" },
  "dash.source": { en: "Source", he: "\u05DE\u05E7\u05D5\u05E8" },
  "dash.opportunity": { en: "Opportunity", he: "\u05D4\u05D6\u05D3\u05DE\u05E0\u05D5\u05EA" },
  "dash.anomaly": { en: "Anomaly", he: "\u05D7\u05E8\u05D9\u05D2\u05D4" },
  "dash.trend": { en: "Trend", he: "\u05DE\u05D2\u05DE\u05D4" },
  // Alerts
  "alerts.title": { en: "Anomaly Alerts", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05D7\u05E8\u05D9\u05D2\u05D5\u05EA" },
  "alerts.critical": { en: "Critical", he: "\u05E7\u05E8\u05D9\u05D8\u05D9" },
  "alerts.warning": { en: "Warning", he: "\u05D0\u05D6\u05D4\u05E8\u05D4" },
  "alerts.info": { en: "Info", he: "\u05DE\u05D9\u05D3\u05E2" },
  "alerts.possibleCauses": { en: "Possible Causes", he: "\u05E1\u05D9\u05D1\u05D5\u05EA \u05D0\u05E4\u05E9\u05E8\u05D9\u05D5\u05EA" },
  "alerts.suggestedAction": { en: "Suggested Action", he: "\u05E4\u05E2\u05D5\u05DC\u05D4 \u05DE\u05D5\u05DE\u05DC\u05E6\u05EA" },
  "alerts.dismiss": { en: "Dismiss", he: "\u05D4\u05EA\u05E2\u05DC\u05DD" },
  "alerts.investigate": { en: "Investigate", he: "\u05D7\u05E7\u05D5\u05E8" },
  "alerts.activeAlerts": { en: "active alerts", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA" },
  "alerts.lastChecked": { en: "Last checked", he: "\u05D1\u05D3\u05D9\u05E7\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4" },
  "alerts.noAlerts": { en: "No alerts at this time.", he: "\u05D0\u05D9\u05DF \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05DB\u05E8\u05D2\u05E2." },
  // Action Plans
  "actions.title": { en: "Daily Action Plan", he: "\u05EA\u05D5\u05DB\u05E0\u05D9\u05EA \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D9\u05D5\u05DE\u05D9\u05EA" },
  "actions.approve": { en: "Approve", he: "\u05D0\u05E9\u05E8" },
  "actions.reject": { en: "Reject", he: "\u05D3\u05D7\u05D4" },
  "actions.defer": { en: "Defer", he: "\u05D3\u05D7\u05D4" },
  "actions.edit": { en: "Edit", he: "\u05E2\u05E8\u05D5\u05DA" },
  "actions.high": { en: "High Impact", he: "\u05D4\u05E9\u05E4\u05E2\u05D4 \u05D2\u05D1\u05D5\u05D4\u05D4" },
  "actions.medium": { en: "Medium Impact", he: "\u05D4\u05E9\u05E4\u05E2\u05D4 \u05D1\u05D9\u05E0\u05D5\u05E0\u05D9\u05EA" },
  "actions.low": { en: "Low Impact", he: "\u05D4\u05E9\u05E4\u05E2\u05D4 \u05E0\u05DE\u05D5\u05DB\u05D4" },
  "actions.estimatedSavings": { en: "Estimated savings", he: "\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05DE\u05E9\u05D5\u05E2\u05E8" },
  "actions.confidence": { en: "Confidence", he: "\u05D1\u05D9\u05D8\u05D7\u05D5\u05DF" },
  "actions.pendingReview": { en: "Pending Review", he: "\u05DE\u05DE\u05EA\u05D9\u05DF \u05DC\u05E1\u05E7\u05D9\u05E8\u05D4" },
  "actions.approved": { en: "Approved", he: "\u05D0\u05D5\u05E9\u05E8" },
  "actions.rejected": { en: "Rejected", he: "\u05E0\u05D3\u05D7\u05D4" },
  "actions.deferred": { en: "Deferred", he: "\u05E0\u05D3\u05D7\u05D4" },
  "actions.completed": { en: "Completed", he: "\u05D4\u05D5\u05E9\u05DC\u05DD" },
  "actions.estSavingsApproved": { en: "Est. Savings (approved)", he: "\u05D7\u05D9\u05E1\u05DB\u05D5\u05DF \u05DE\u05E9\u05D5\u05E2\u05E8 (\u05DE\u05D0\u05D5\u05E9\u05E8)" },
  "actions.taskCompletion": { en: "Task completion", he: "\u05D4\u05E9\u05DC\u05DE\u05EA \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA" },
  "actions.reviewed": { en: "reviewed", he: "\u05E0\u05E1\u05E7\u05E8\u05D5" },
  "actions.tasksGenerated": { en: "tasks generated", he: "\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05E0\u05D5\u05E6\u05E8\u05D5" },
  "actions.description": { en: "Description", he: "\u05EA\u05D9\u05D0\u05D5\u05E8" },
  "actions.rationale": { en: "Rationale", he: "\u05E0\u05D9\u05DE\u05D5\u05E7" },
  "actions.triggeredBy": { en: "Triggered by", he: "\u05D4\u05D5\u05E4\u05E2\u05DC \u05E2\u05DC \u05D9\u05D3\u05D9" },
  // Forecast
  "forecast.title": { en: "Demand Forecast", he: "\u05EA\u05D7\u05D6\u05D9\u05EA \u05D1\u05D9\u05E7\u05D5\u05E9" },
  "forecast.hourly": { en: "Hourly Forecast", he: "\u05EA\u05D7\u05D6\u05D9\u05EA \u05E9\u05E2\u05EA\u05D9\u05EA" },
  "forecast.byItem": { en: "By Item", he: "\u05DC\u05E4\u05D9 \u05E4\u05E8\u05D9\u05D8" },
  "forecast.accuracy": { en: "Forecast Accuracy", he: "\u05D3\u05D9\u05D5\u05E7 \u05EA\u05D7\u05D6\u05D9\u05EA" },
  "forecast.covers": { en: "Covers", he: "\u05E1\u05D5\u05E2\u05D3\u05D9\u05DD" },
  "forecast.actual": { en: "Actual", he: "\u05D1\u05E4\u05D5\u05E2\u05DC" },
  "forecast.predicted": { en: "Predicted", he: "\u05D7\u05D6\u05D5\u05D9" },
  "forecast.7day": { en: "7-day forecast", he: "\u05EA\u05D7\u05D6\u05D9\u05EA \u05DC-7 \u05D9\u05DE\u05D9\u05DD" },
  "forecast.updatedHourly": { en: "Updated hourly", he: "\u05DE\u05EA\u05E2\u05D3\u05DB\u05DF \u05DB\u05DC \u05E9\u05E2\u05D4" },
  "forecast.vsAvg": { en: "vs avg", he: "\u05DC\u05E2\u05D5\u05DE\u05EA \u05DE\u05DE\u05D5\u05E6\u05E2" },
  "forecast.soFar": { en: "(so far)", he: "(\u05E2\u05D3 \u05DB\u05D4)" },
  "forecast.until": { en: "until", he: "\u05E2\u05D3" },
  "forecast.belowTarget": { en: "Below 15% target", he: "\u05DE\u05EA\u05D7\u05EA \u05DC\u05D9\u05E2\u05D3 15%" },
  "forecast.excellent": { en: "Excellent", he: "\u05DE\u05E6\u05D5\u05D9\u05DF" },
  "forecast.directionalAccuracy": { en: "Directional Accuracy", he: "\u05D3\u05D9\u05D5\u05E7 \u05DB\u05D9\u05D5\u05D5\u05E0\u05D9" },
  "forecast.mape": { en: "MAPE", he: "MAPE" },
  "forecast.mapeTrend": { en: "MAPE Trend", he: "\u05DE\u05D2\u05DE\u05EA MAPE" },
  "forecast.lowerIsBetter": { en: "Lower is better. Target: <15%", he: "\u05DB\u05DB\u05DC \u05E9\u05E0\u05DE\u05D5\u05DA \u05D9\u05D5\u05EA\u05E8 - \u05D8\u05D5\u05D1 \u05D9\u05D5\u05EA\u05E8. \u05D9\u05E2\u05D3: <15%" },
  "forecast.todaysForecast": { en: "Today's Forecast", he: "\u05EA\u05D7\u05D6\u05D9\u05EA \u05DC\u05D4\u05D9\u05D5\u05DD" },
  "forecast.item": { en: "Item", he: "\u05E4\u05E8\u05D9\u05D8" },
  "forecast.lastWeek": { en: "Last Week", he: "\u05E9\u05D1\u05D5\u05E2 \u05E9\u05E2\u05D1\u05E8" },
  "forecast.change": { en: "Change", he: "\u05E9\u05D9\u05E0\u05D5\u05D9" },
  "forecast.relative": { en: "Relative", he: "\u05D9\u05D7\u05E1\u05D9" },
  // Chat
  "chat.title": { en: "AI Assistant", he: "\u05E2\u05D5\u05D6\u05E8 AI" },
  "chat.placeholder": { en: "Ask about your restaurant data...", he: "...\u05E9\u05D0\u05DC \u05E2\u05DC \u05E0\u05EA\u05D5\u05E0\u05D9 \u05D4\u05DE\u05E1\u05E2\u05D3\u05D4 \u05E9\u05DC\u05DA" },
  "chat.thinking": { en: "Analyzing data...", he: "...\u05DE\u05E0\u05EA\u05D7 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD" },
  "chat.howCanIHelp": { en: "How can I help you today?", he: "\u05D0\u05D9\u05DA \u05D0\u05D5\u05DB\u05DC \u05DC\u05E2\u05D6\u05D5\u05E8 \u05DC\u05DA \u05D4\u05D9\u05D5\u05DD?" },
  "chat.askAbout": {
    en: "Ask me about your restaurant's performance, costs, trends, or anything related to your operations data.",
    he: "\u05E9\u05D0\u05DC \u05D0\u05D5\u05EA\u05D9 \u05E2\u05DC \u05D1\u05D9\u05E6\u05D5\u05E2\u05D9 \u05D4\u05DE\u05E1\u05E2\u05D3\u05D4, \u05E2\u05DC\u05D5\u05D9\u05D5\u05EA, \u05DE\u05D2\u05DE\u05D5\u05EA, \u05D0\u05D5 \u05DB\u05DC \u05D3\u05D1\u05E8 \u05D4\u05E7\u05E9\u05D5\u05E8 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9 \u05D4\u05EA\u05E4\u05E2\u05D5\u05DC \u05E9\u05DC\u05DA.",
  },
  "chat.queryingSales": { en: "Querying sales data...", he: "...\u05DE\u05D0\u05D7\u05D6\u05E8 \u05E0\u05EA\u05D5\u05E0\u05D9 \u05DE\u05DB\u05D9\u05E8\u05D5\u05EA" },
  "chat.analyzingProcurement": { en: "Analyzing procurement records...", he: "...\u05DE\u05E0\u05EA\u05D7 \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA \u05E8\u05DB\u05E9" },
  "chat.correlating": { en: "Correlating patterns...", he: "...\u05DE\u05EA\u05D0\u05DD \u05D3\u05E4\u05D5\u05E1\u05D9\u05DD" },
  "chat.generating": { en: "Generating response...", he: "...\u05DE\u05D9\u05D9\u05E6\u05E8 \u05EA\u05E9\u05D5\u05D1\u05D4" },
  // HQ
  "hq.title": { en: "HQ Operations Overview", he: "\u05E1\u05E7\u05D9\u05E8\u05EA \u05EA\u05E4\u05E2\u05D5\u05DC \u05DE\u05D8\u05D4\"\u05DB\u05DC" },
  "hq.branchComparison": { en: "Branch Comparison", he: "\u05D4\u05E9\u05D5\u05D5\u05D0\u05EA \u05E1\u05E0\u05D9\u05E4\u05D9\u05DD" },
  "hq.topPerformers": { en: "Top Performers", he: "\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD" },
  "hq.needsAttention": { en: "Needs Attention", he: "\u05D3\u05D5\u05E8\u05E9 \u05EA\u05E9\u05D5\u05DE\u05EA \u05DC\u05D1" },
  "hq.totalRevenue": { en: "Total Revenue", he: "\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA \u05DB\u05D5\u05DC\u05DC\u05D5\u05EA" },
  "hq.avgFoodCost": { en: "Avg Food Cost", he: "\u05E2\u05DC\u05D5\u05EA \u05DE\u05D6\u05D5\u05DF \u05DE\u05DE\u05D5\u05E6\u05E2\u05EA" },
  "hq.avgLaborCost": { en: "Avg Labor Cost", he: "\u05E2\u05DC\u05D5\u05EA \u05E2\u05D1\u05D5\u05D3\u05D4 \u05DE\u05DE\u05D5\u05E6\u05E2\u05EA" },
  "hq.avgProfit": { en: "Avg Profit", he: "\u05E8\u05D5\u05D5\u05D7 \u05DE\u05DE\u05D5\u05E6\u05E2" },
  "hq.activeAlerts": { en: "Active Alerts", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA" },
  "hq.branchPerformance": { en: "Branch Performance", he: "\u05D1\u05D9\u05E6\u05D5\u05E2\u05D9 \u05E1\u05E0\u05D9\u05E4\u05D9\u05DD" },
  "hq.branch": { en: "Branch", he: "\u05E1\u05E0\u05D9\u05E3" },
  "hq.manager": { en: "Manager", he: "\u05DE\u05E0\u05D4\u05DC" },
  "hq.revenue": { en: "Revenue", he: "\u05D4\u05DB\u05E0\u05E1\u05D5\u05EA" },
  "hq.foodCost": { en: "Food Cost", he: "\u05E2\u05DC\u05D5\u05EA \u05DE\u05D6\u05D5\u05DF" },
  "hq.labor": { en: "Labor", he: "\u05E2\u05D1\u05D5\u05D3\u05D4" },
  "hq.profit": { en: "Profit", he: "\u05E8\u05D5\u05D5\u05D7" },
  "hq.alerts": { en: "Alerts", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA" },
  "hq.actions": { en: "Actions", he: "\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA" },
  "hq.pushTask": { en: "Push Task", he: "\u05E9\u05DC\u05D7 \u05DE\u05E9\u05D9\u05DE\u05D4" },
  "hq.branches": { en: "branches", he: "\u05E1\u05E0\u05D9\u05E4\u05D9\u05DD" },
  "hq.weekOf": { en: "Week of", he: "\u05E9\u05D1\u05D5\u05E2 \u05E9\u05DC" },
  "hq.revenueK": { en: "Revenue ($K)", he: "(\u05D0\u05DC\u05E4\u05D9 \u20AA) \u05D4\u05DB\u05E0\u05E1\u05D5\u05EA" },
  "hq.profitPct": { en: "Profit %", he: "% \u05E8\u05D5\u05D5\u05D7" },
  "hq.foodCostPct": { en: "Food Cost %", he: "% \u05E2\u05DC\u05D5\u05EA \u05DE\u05D6\u05D5\u05DF" },
  // Data
  "data.title": { en: "Data Management", he: "\u05E0\u05D9\u05D4\u05D5\u05DC \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD" },
  "data.integrations": { en: "Integrations", he: "\u05D0\u05D9\u05E0\u05D8\u05D2\u05E8\u05E6\u05D9\u05D5\u05EA" },
  "data.fileImport": { en: "File Import", he: "\u05D9\u05D9\u05D1\u05D5\u05D0 \u05E7\u05D1\u05E6\u05D9\u05DD" },
  "data.connected": { en: "Connected", he: "\u05DE\u05D7\u05D5\u05D1\u05E8" },
  "data.disconnected": { en: "Disconnected", he: "\u05DE\u05E0\u05D5\u05EA\u05E7" },
  "data.syncing": { en: "Syncing", he: "\u05DE\u05E1\u05E0\u05DB\u05E8\u05DF" },
  "data.lastSync": { en: "Last sync", he: "\u05E1\u05E0\u05DB\u05E8\u05D5\u05DF \u05D0\u05D7\u05E8\u05D5\u05DF" },
  "data.uploadFile": { en: "Upload File", he: "\u05D4\u05E2\u05DC\u05D4 \u05E7\u05D5\u05D1\u05E5" },
  "data.dragDrop": { en: "Drag and drop files here, or click to browse", he: "\u05D2\u05E8\u05D5\u05E8 \u05E7\u05D1\u05E6\u05D9\u05DD \u05DC\u05DB\u05D0\u05DF, \u05D0\u05D5 \u05DC\u05D7\u05E5 \u05DC\u05E2\u05D9\u05D5\u05DF" },
  "data.integrationsActive": { en: "integrations active", he: "\u05D0\u05D9\u05E0\u05D8\u05D2\u05E8\u05E6\u05D9\u05D5\u05EA \u05E4\u05E2\u05D9\u05DC\u05D5\u05EA" },
  "data.pipelineHealth": { en: "Data Pipeline Health", he: "\u05D1\u05E8\u05D9\u05D0\u05D5\u05EA \u05E6\u05E0\u05E8\u05EA \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD" },
  "data.healthy": { en: "Healthy", he: "\u05EA\u05E7\u05D9\u05DF" },
  "data.lastFullSync": { en: "Last full sync", he: "\u05E1\u05E0\u05DB\u05E8\u05D5\u05DF \u05DE\u05DC\u05D0 \u05D0\u05D7\u05E8\u05D5\u05DF" },
  "data.nextSync": { en: "Next sync", he: "\u05E1\u05E0\u05DB\u05E8\u05D5\u05DF \u05D4\u05D1\u05D0" },
  "data.recordsToday": { en: "Records today", he: "\u05E8\u05E9\u05D5\u05DE\u05D5\u05EA \u05D4\u05D9\u05D5\u05DD" },
  "data.syncNow": { en: "Sync Now", he: "\u05E1\u05E0\u05DB\u05E8\u05DF \u05E2\u05DB\u05E9\u05D9\u05D5" },
  "data.disconnect": { en: "Disconnect", he: "\u05E0\u05EA\u05E7" },
  "data.connect": { en: "Connect", he: "\u05D7\u05D1\u05E8" },
  "data.recentUploads": { en: "Recent Uploads", he: "\u05D4\u05E2\u05DC\u05D0\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA" },
  "data.processing": { en: "Processing", he: "\u05DE\u05E2\u05D1\u05D3" },
  "data.records": { en: "records", he: "\u05E8\u05E9\u05D5\u05DE\u05D5\u05EA" },
  "data.supportsFiles": { en: "Supports CSV, XLSX, XLS files", he: "\u05EA\u05D5\u05DE\u05DA \u05D1\u05E7\u05D1\u05E6\u05D9 CSV, XLSX, XLS" },
  "data.pos": { en: "Point of Sale (POS)", he: "\u05E0\u05E7\u05D5\u05D3\u05EA \u05DE\u05DB\u05D9\u05E8\u05D4 (POS)" },
  "data.procurement": { en: "Procurement", he: "\u05E8\u05DB\u05E9" },
  "data.workforce": { en: "Workforce", he: "\u05DB\u05D5\u05D7 \u05D0\u05D3\u05DD" },
  "data.fileStorage": { en: "File Storage", he: "\u05D0\u05D7\u05E1\u05D5\u05DF \u05E7\u05D1\u05E6\u05D9\u05DD" },
  "data.gdriveAutoImport": { en: "Google Drive Auto-Import", he: "\u05D9\u05D9\u05D1\u05D5\u05D0 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9 \u05DE\u05D2\u05D5\u05D2\u05DC \u05D3\u05E8\u05D9\u05D9\u05D1" },
  "data.linkFolder": { en: "Link a shared folder for automatic file ingestion", he: "\u05E7\u05E9\u05E8 \u05EA\u05D9\u05E7\u05D9\u05D9\u05D4 \u05DE\u05E9\u05D5\u05EA\u05E4\u05EA \u05DC\u05E7\u05DC\u05D9\u05D8\u05EA \u05E7\u05D1\u05E6\u05D9\u05DD \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05EA" },
  "data.linked": { en: "Linked", he: "\u05DE\u05E7\u05D5\u05E9\u05E8" },
  "data.folder": { en: "Folder", he: "\u05EA\u05D9\u05E7\u05D9\u05D9\u05D4" },
  "data.lastChecked": { en: "Last checked", he: "\u05D1\u05D3\u05D9\u05E7\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4" },
  "data.newFilesProcessed": { en: "new files processed", he: "\u05E7\u05D1\u05E6\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD \u05E2\u05D5\u05D1\u05D3\u05D5" },
  // Settings
  "settings.title": { en: "Settings", he: "\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA" },
  "settings.language": { en: "Language", he: "\u05E9\u05E4\u05D4" },
  "settings.branch": { en: "Branch", he: "\u05E1\u05E0\u05D9\u05E3" },
  "settings.role": { en: "Role", he: "\u05EA\u05E4\u05E7\u05D9\u05D3" },
  "settings.notifications": { en: "Notifications", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA" },
  "settings.profile": { en: "Profile", he: "\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC" },
  "settings.branchManager": { en: "Branch Manager", he: "\u05DE\u05E0\u05D4\u05DC \u05E1\u05E0\u05D9\u05E3" },
  "settings.managePrefs": { en: "Manage your preferences and account settings", he: "\u05E0\u05D4\u05DC \u05D0\u05EA \u05D4\u05D4\u05E2\u05D3\u05E4\u05D5\u05EA \u05D5\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05D4\u05D7\u05E9\u05D1\u05D5\u05DF \u05E9\u05DC\u05DA" },
  "settings.inAppNotifications": { en: "In-App Notifications", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05D1\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4" },
  "settings.inAppDesc": { en: "Alerts and insights shown in the app", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05D5\u05EA\u05D5\u05D1\u05E0\u05D5\u05EA \u05D4\u05DE\u05D5\u05E6\u05D2\u05D5\u05EA \u05D1\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D4" },
  "settings.emailNotifications": { en: "Email Notifications", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05D1\u05DE\u05D9\u05D9\u05DC" },
  "settings.emailDesc": { en: "Critical alerts sent via email", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05E7\u05E8\u05D9\u05D8\u05D9\u05D5\u05EA \u05E0\u05E9\u05DC\u05D7\u05D5\u05EA \u05D1\u05DE\u05D9\u05D9\u05DC" },
  "settings.smsAlerts": { en: "SMS Alerts", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA SMS" },
  "settings.smsDesc": { en: "Urgent alerts sent via SMS", he: "\u05D4\u05EA\u05E8\u05D0\u05D5\u05EA \u05D3\u05D7\u05D5\u05E4\u05D5\u05EA \u05E0\u05E9\u05DC\u05D7\u05D5\u05EA \u05D1-SMS" },
  "settings.dailyDigest": { en: "Daily Digest", he: "\u05E1\u05D9\u05DB\u05D5\u05DD \u05D9\u05D5\u05DE\u05D9" },
  "settings.dailyDigestDesc": { en: "Morning summary of yesterday's performance", he: "\u05E1\u05D9\u05DB\u05D5\u05DD \u05D1\u05D5\u05E7\u05E8 \u05E9\u05DC \u05D1\u05D9\u05E6\u05D5\u05E2\u05D9 \u05D0\u05EA\u05DE\u05D5\u05DC" },
  "settings.alertSensitivity": { en: "Alert Sensitivity", he: "\u05E8\u05D2\u05D9\u05E9\u05D5\u05EA \u05D4\u05EA\u05E8\u05D0\u05D5\u05EA" },
  "settings.alertSensitivityDesc": { en: "Configure the deviation threshold (%) that triggers an alert for each KPI.", he: "\u05D4\u05D2\u05D3\u05E8 \u05D0\u05EA \u05E1\u05E3 \u05D4\u05E1\u05D8\u05D9\u05D9\u05D4 (%) \u05E9\u05DE\u05E4\u05E2\u05D9\u05DC \u05D4\u05EA\u05E8\u05D0\u05D4 \u05E2\u05D1\u05D5\u05E8 \u05DB\u05DC \u05DE\u05D3\u05D3." },
  "settings.sensitive": { en: "Sensitive (1%)", he: "\u05E8\u05D2\u05D9\u05E9 (1%)" },
  "settings.relaxed": { en: "Relaxed (30%)", he: "\u05DE\u05E8\u05D5\u05D7 (30%)" },
  "settings.accessControl": { en: "Access Control", he: "\u05D1\u05E7\u05E8\u05EA \u05D2\u05D9\u05E9\u05D4" },
  "settings.currentRole": { en: "Current Role", he: "\u05EA\u05E4\u05E7\u05D9\u05D3 \u05E0\u05D5\u05DB\u05D7\u05D9" },
  "settings.singleBranch": { en: "Branch Manager - Single branch access", he: "\u05DE\u05E0\u05D4\u05DC \u05E1\u05E0\u05D9\u05E3 - \u05D2\u05D9\u05E9\u05D4 \u05DC\u05E1\u05E0\u05D9\u05E3 \u05D1\u05D5\u05D3\u05D3" },
  "settings.dataAccess": { en: "Data Access", he: "\u05D2\u05D9\u05E9\u05D4 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD" },
  "settings.onlyBranch": { en: "only", he: "\u05D1\u05DC\u05D1\u05D3" },
  "settings.contactHQ": { en: "Contact your HQ administrator to modify access permissions.", he: "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05DE\u05E0\u05D4\u05DC \u05D4\u05DE\u05D8\u05D4 \u05DC\u05E9\u05D9\u05E0\u05D5\u05D9 \u05D4\u05E8\u05E9\u05D0\u05D5\u05EA \u05D2\u05D9\u05E9\u05D4." },
  // Common
  "common.branch": { en: "Branch", he: "\u05E1\u05E0\u05D9\u05E3" },
  "common.all": { en: "All", he: "\u05D4\u05DB\u05DC" },
  "common.save": { en: "Save", he: "\u05E9\u05DE\u05D5\u05E8" },
  "common.cancel": { en: "Cancel", he: "\u05D1\u05D9\u05D8\u05D5\u05DC" },
  "common.search": { en: "Search", he: "\u05D7\u05D9\u05E4\u05D5\u05E9" },
  "common.filter": { en: "Filter", he: "\u05E1\u05D9\u05E0\u05D5\u05DF" },
  "common.export": { en: "Export", he: "\u05D9\u05D9\u05E6\u05D5\u05D0" },
  "common.goodMorning": { en: "Good Morning", he: "\u05D1\u05D5\u05E7\u05E8 \u05D8\u05D5\u05D1" },
  "common.manager": { en: "Manager", he: "\u05DE\u05E0\u05D4\u05DC" },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
  dir: "ltr",
  currency: "$",
  formatCurrency: (amount: number) => `$${amount.toLocaleString()}`,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = useCallback(
    (key: string) => {
      return translations[key]?.[lang] || key;
    },
    [lang]
  );

  const dir = lang === "he" ? "rtl" : "ltr";
  const currency = lang === "he" ? "\u20AA" : "$";

  const formatCurrency = useCallback(
    (amount: number) => {
      if (lang === "he") {
        return `\u20AA${amount.toLocaleString("he-IL")}`;
      }
      return `$${amount.toLocaleString("en-US")}`;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir, currency, formatCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
