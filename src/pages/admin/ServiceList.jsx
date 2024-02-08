import React from "react";
import  ServiceListCreatePage  from "../../components/admin/Services";
import AdminSideBar from "./AdminSIdeBar";

function ServiceList(){
    return(
        <>
        <div className=" overflow-hidden bg-gray-100">

        <div className="flex h-screen overflow-hidden">
            <AdminSideBar />
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-auto card">

                <div>
                    <main className=" w-full h-screen">
                        <div className="mx-auto my-16 max-w-screen-2xl px-1 md:px-3 py-4 md:py-6 2xl:px-10">
                        <ServiceListCreatePage />
                        </div>
                    </main>
                </div>
            </div>
        </div>
        </div>
        </>
       
    )
}
export default ServiceList