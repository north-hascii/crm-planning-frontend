import React, {useState} from 'react';
import './CalendarPage.scss'
import Calendar from "./Calendar";
import SectionBar from "../../components/optionsBar/SectionBar";
import {ADMIN_ROUTE} from "../../utils/consts";
import AdminTable from "../../components/adminTable/adminTable";

function CalendarPage(props) {
    const [dateState, setDateState] = useState(null)

    const handleDateChanged = (date) => {
        setDateState(date)
        console.log('parent', date)
    }
    return (
        <div className={'admin-page'}>
            {/*{!isPageLoading &&*/}
            {/*    <>*/}
            {/*        <SectionBar type={'admin'} sections={adminOptionsArray} selectedSection={selectedSection}*/}
            {/*                    onPress={(section) => {*/}
            {/*                        setSelectedSection(section)*/}
            {/*                        navigate(ADMIN_ROUTE + '/' + section)*/}
            {/*                    }}/>*/}
            {/*    </>*/}
            {/*}*/}
            <div className={'admin-page-container'}>
                {/*{!isPageLoading &&*/}
                {/*    <>*/}
                <div className={'page-title'}>
                    Каледнарь
                </div>
                {/*    </>*/}
                {/*}*/}
                {/*{isTableLoading &&*/}
                {/*    <div>*/}
                {/*        Loading...*/}
                {/*    </div>*/}
                {/*}*/}
                {/*{!isTableLoading &&*/}
                {/*    <AdminTable tableType={selectedSection} tableItems={tableItems}/>*/}
                {/*}*/}
                {dateState &&
                    <div>
                        Выбрана дата: {dateState.toLocaleDateString()}
                    </div>
                }
                <Calendar onChange={(date) => handleDateChanged(date)}/>
            </div>
        </div>
    );
}

export default CalendarPage;