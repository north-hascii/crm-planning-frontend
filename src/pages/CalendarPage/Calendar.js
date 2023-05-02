import React from 'react';
import './Calendar.scss'
import * as calendar from './calendar'

function Calendar({
                      onChange = (date) => {
                      }
                  }) {
    const defaultProps = {
        date: new Date(),
        // years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        years: [2022, 2023, 2024, 2025],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    }

    const [dateState, setDateState] = React.useState(defaultProps.date)

    const [currentDate, setCurrentDate] = React.useState(new Date())
    const [selectedDate, setSelectedDate] = React.useState(null)

    const monthData = calendar.getMonthData(dateState.getFullYear(), dateState.getMonth())

    const handlePrevMonthButtonClick = () => {
        const newDate = new Date(dateState.getFullYear(), dateState.getMonth() - 1)
        // console.log(newDate)
        setDateState(newDate)
    }

    const handleNextMonthButtonClick = () => {
        const newDate = new Date(dateState.getFullYear(), dateState.getMonth() + 1)
        // console.log(newDate)
        setDateState(newDate)
    }

    const handleYearSelectChange = (year) => {
        const newDate = new Date(year, dateState.getMonth())
        // console.log(newDate)
        setDateState(newDate)
    }

    const handleMonthSelectChange = (month) => {
        const newDate = new Date(dateState.getFullYear(), month)
        // console.log(newDate)
        setDateState(newDate)
    }

    const handleDayClick = (date) => {
        // console.log(date)
        setSelectedDate(date)
        onChange(date)
    }

    return (
        <div className="calendar-widget">
            <div className={'calendar-widget-top'}>
                <svg className={'calendar-widget-button-prev'}
                    onClick={handlePrevMonthButtonClick}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 11.29C8.19896 11.3851 8.12759 11.4972 8.08 11.62C7.97998 11.8635 7.97998 12.1365 8.08 12.38C8.12759 12.5028 8.19896 12.6149 8.29 12.71L11.29 15.71C11.4783 15.8983 11.7337 16.0041 12 16.0041C12.2663 16.0041 12.5217 15.8983 12.71 15.71C12.8983 15.5217 13.0041 15.2663 13.0041 15C13.0041 14.7337 12.8983 14.4783 12.71 14.29L11.41 13H15C15.2652 13 15.5196 12.8946 15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12C16 11.7348 15.8946 11.4804 15.7071 11.2929C15.5196 11.1054 15.2652 11 15 11H11.41L12.71 9.71C12.8037 9.61704 12.8781 9.50644 12.9289 9.38458C12.9797 9.26272 13.0058 9.13201 13.0058 9C13.0058 8.86799 12.9797 8.73728 12.9289 8.61542C12.8781 8.49356 12.8037 8.38296 12.71 8.29C12.617 8.19627 12.5064 8.12188 12.3846 8.07111C12.2627 8.02034 12.132 7.9942 12 7.9942C11.868 7.9942 11.7373 8.02034 11.6154 8.07111C11.4936 8.12188 11.383 8.19627 11.29 8.29L8.29 11.29ZM2 12C2 13.9778 2.58649 15.9112 3.6853 17.5557C4.78412 19.2002 6.3459 20.4819 8.17317 21.2388C10.0004 21.9957 12.0111 22.1937 13.9509 21.8079C15.8907 21.422 17.6725 20.4696 19.0711 19.0711C20.4696 17.6725 21.422 15.8907 21.8079 13.9509C22.1937 12.0111 21.9957 10.0004 21.2388 8.17317C20.4819 6.3459 19.2002 4.78412 17.5557 3.6853C15.9112 2.58649 13.9778 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12V12ZM20 12C20 13.5823 19.5308 15.129 18.6518 16.4446C17.7727 17.7602 16.5233 18.7855 15.0615 19.391C13.5997 19.9965 11.9911 20.155 10.4393 19.8463C8.88743 19.5376 7.46197 18.7757 6.34315 17.6569C5.22433 16.538 4.4624 15.1126 4.15372 13.5607C3.84504 12.0089 4.00346 10.4003 4.60896 8.93853C5.21447 7.47672 6.23984 6.22729 7.55544 5.34824C8.87103 4.46919 10.4177 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12Z" fill="#4C4C4C" fill-opacity="0.5"/>
                </svg>
                <select className={'calendar-widget-select-month'}
                    value={dateState.getMonth()}
                    onChange={(e) => handleMonthSelectChange(e.target.value)}>
                    {defaultProps.monthNames.map((name, index) => {
                        return (
                            <option value={index} key={name}>{name}</option>
                        )
                    })}
                </select>
                <select className={'calendar-widget-select-year'}
                    value={dateState.getFullYear()}
                    onChange={(e) => handleYearSelectChange(e.target.value)}>
                    {defaultProps.years.map((year, index) => {
                        return (
                            <option value={year} key={year}>{year}</option>
                        )
                    })}
                </select>
                <svg className={'calendar-widget-button-next'}
                    onClick={handleNextMonthButtonClick}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.71 12.71C15.801 12.6149 15.8724 12.5028 15.92 12.38C16.02 12.1365 16.02 11.8635 15.92 11.62C15.8724 11.4973 15.801 11.3851 15.71 11.29L12.71 8.29C12.5217 8.1017 12.2663 7.99591 12 7.99591C11.7337 7.99591 11.4783 8.1017 11.29 8.29C11.1017 8.47831 10.9959 8.7337 10.9959 9C10.9959 9.26631 11.1017 9.5217 11.29 9.71L12.59 11H9C8.73479 11 8.48043 11.1054 8.2929 11.2929C8.10536 11.4804 8 11.7348 8 12C8 12.2652 8.10536 12.5196 8.2929 12.7071C8.48043 12.8946 8.73479 13 9 13H12.59L11.29 14.29C11.1963 14.383 11.1219 14.4936 11.0711 14.6154C11.0203 14.7373 10.9942 14.868 10.9942 15C10.9942 15.132 11.0203 15.2627 11.0711 15.3846C11.1219 15.5064 11.1963 15.617 11.29 15.71C11.383 15.8037 11.4936 15.8781 11.6154 15.9289C11.7373 15.9797 11.868 16.0058 12 16.0058C12.132 16.0058 12.2627 15.9797 12.3846 15.9289C12.5064 15.8781 12.617 15.8037 12.71 15.71L15.71 12.71ZM22 12C22 10.0222 21.4135 8.08879 20.3147 6.4443C19.2159 4.79981 17.6541 3.51809 15.8268 2.76121C13.9996 2.00433 11.9889 1.8063 10.0491 2.19215C8.10929 2.578 6.32746 3.53041 4.92894 4.92894C3.53041 6.32746 2.578 8.10929 2.19215 10.0491C1.8063 11.9889 2.00433 13.9996 2.76121 15.8268C3.51809 17.6541 4.79981 19.2159 6.4443 20.3147C8.08879 21.4135 10.0222 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12V12ZM4 12C4 10.4178 4.4692 8.87104 5.34825 7.55544C6.2273 6.23985 7.47673 5.21447 8.93854 4.60897C10.4003 4.00347 12.0089 3.84504 13.5607 4.15372C15.1126 4.4624 16.538 5.22433 17.6569 6.34315C18.7757 7.46197 19.5376 8.88743 19.8463 10.4393C20.155 11.9911 19.9965 13.5997 19.391 15.0615C18.7855 16.5233 17.7602 17.7727 16.4446 18.6518C15.129 19.5308 13.5823 20 12 20C9.87827 20 7.84344 19.1572 6.34315 17.6569C4.84286 16.1566 4 14.1217 4 12V12Z" fill="#4C4C4C" fill-opacity="0.5"/>
                </svg>
            </div>
            <div className={'calendar-widget-bottom'}>
                <table>
                    <thead>
                    <tr>
                        {defaultProps.weekDayNames.map(name =>
                            <th key={name}>{name}</th>
                        )}
                    </tr>
                    </thead>

                    <tbody>
                    {monthData.map((week, index) => {
                        return (
                            <tr className={'week'} key={index}>
                                {week.map((date, index) => {
                                    if (date) {
                                        return <td className={`day` +  `${calendar.areEqual(date, currentDate) ? ' today' : ''}` +
                                        `${calendar.areEqual(date, selectedDate) ? ' selected' : ''}`}
                                                   onClick={() => handleDayClick(date)}
                                                   key={index}>{date.getDate()}</td>
                                    } else {
                                        return <td key={index}/>
                                    }
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Calendar;