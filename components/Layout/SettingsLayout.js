import React from "react";
import Layout from "./Layout";
import SettingsSidebar from "./SettingsSidebar";

const SettingsLayout = ({ children }) => {
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <SettingsSidebar />
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsLayout;
