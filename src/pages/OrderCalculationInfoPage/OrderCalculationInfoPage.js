import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getOrderById} from "../../http/orderApi";
import OrderEditor from "../../components/orderEditor/OrderEditor";
import OrderInfo from "../../components/orderInfo/OrderInfo";
import {ORDER_INFO_ROUTE, ORDER_EDIT_ROUTE} from "../../utils/consts";


function OrderCalculationInfoPage(props) {
    const {id} = useParams()

    const [isLoading, setIsLoading] = React.useState(true)
    const [order, setOrder] = React.useState(null)
    const navigate = useNavigate()

    React.useEffect(() => {
        setIsLoading(true)
        getOrderById(id).then(data => {
            console.log(data)
            setOrder(data)
            setIsLoading(false)

        }).catch(err => {
            console.log("Error while getting order data", err)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return (
            <div>
                Loading
            </div>
        )
    }

    const redirectToOrderEditor = (orderId) => {
        navigate(`${ORDER_EDIT_ROUTE}/${orderId}`)
    }

    return (
        <div className={'admin-page-edit'}>
            <div className={'admin-page-container'}>
                <div className={'page-header'}>
                    <div className={'page-title-container flex-sb-row'}>
                        <div className={'page-title'}>
                            Калькуляция
                        </div>
                        <div className={'col-buttons-container'}>
                            <svg onClick={() => redirectToOrderEditor(id)} width="20" height="19"
                                 viewBox="0 0 20 19"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M16.3296 0.0725714C16.0404 0.14874 15.9064 0.209638 15.6487 0.381876C15.4836 0.49232 7.01841 8.95678 6.87479 9.15512C6.79665 9.26302 5.65341 13.3433 5.65367 13.5134C5.65396 13.7235 5.89593 13.9625 6.1084 13.9625C6.27044 13.9625 10.3367 12.8091 10.4395 12.734C10.4946 12.6937 12.4568 10.7316 14.8 8.37375C17.9113 5.24293 19.1015 4.02195 19.2129 3.84669C19.4878 3.41454 19.6029 2.83783 19.5159 2.32884C19.4907 2.18102 19.407 1.93467 19.3203 1.7531C19.1843 1.46825 19.115 1.38174 18.6442 0.908634C18.1727 0.434783 18.0878 0.366194 17.8039 0.2298C17.3022 -0.0112514 16.8364 -0.0609103 16.3296 0.0725714ZM17.408 1.08681C17.6109 1.18971 18.3648 1.94938 18.4768 2.16381C18.5511 2.30592 18.5647 2.38653 18.5651 2.68654C18.5657 3.13683 18.4974 3.28214 18.0759 3.72777L17.7717 4.04936L16.6452 2.91736L15.5187 1.78536L15.846 1.47277C16.026 1.30086 16.2473 1.12426 16.3377 1.08027C16.6594 0.923756 17.0918 0.926407 17.408 1.08681ZM2.30939 1.92515C1.53173 2.13495 0.934619 2.69322 0.658134 3.46898L0.544434 3.78799V10.4154C0.544434 16.7377 0.547555 17.0531 0.61258 17.2648C0.749577 17.7109 0.899134 17.9601 1.23139 18.2961C1.46485 18.5321 1.6182 18.6513 1.81691 18.7509C2.35952 19.0229 1.82635 19.0063 9.66647 18.9948L16.7077 18.9844L16.9582 18.8864C17.6883 18.601 18.2038 18.072 18.4456 17.3602C18.5269 17.1209 18.5282 17.0833 18.5398 14.7092C18.5503 12.5461 18.5454 12.2893 18.4913 12.1863C18.4117 12.035 18.2549 11.9462 18.067 11.9462C17.9449 11.9462 17.8864 11.9719 17.7754 12.074L17.6366 12.2018L17.6181 14.5663C17.5996 16.922 17.5992 16.9316 17.5145 17.142C17.3611 17.5234 17.0746 17.8113 16.6951 17.9655L16.4848 18.0509L9.66874 18.0609C5.16985 18.0674 2.78329 18.0579 2.64849 18.0329C2.20085 17.9497 1.80383 17.6436 1.6173 17.2378L1.51052 17.0055V10.4341V3.86267L1.61831 3.62811C1.75519 3.3302 2.07188 3.02657 2.37311 2.9044L2.58807 2.81722L4.92896 2.79855C7.5437 2.77771 7.39748 2.79377 7.53021 2.51269C7.61574 2.33157 7.57717 2.15776 7.41547 1.99523L7.28594 1.86511L4.89986 1.86757C2.91843 1.86959 2.47909 1.87937 2.30939 1.92515ZM15.9833 3.60142L17.079 4.70299L13.6144 8.18445L10.1497 11.666L9.0535 10.5649C8.45055 9.95926 7.95725 9.44691 7.95725 9.42626C7.95725 9.37716 14.8012 2.49985 14.85 2.49985C14.8706 2.49985 15.3806 2.99554 15.9833 3.60142ZM9.21152 12.1298C9.07709 12.175 6.82415 12.799 6.81795 12.7927C6.81393 12.7887 6.92678 12.3656 7.06868 11.8524C7.21062 11.3393 7.36222 10.7875 7.40558 10.6262L7.48447 10.3329L8.37133 11.2235C8.86046 11.7147 9.23727 12.1211 9.21152 12.1298Z"
                                      fill="#4C4C4C"
                                />
                            </svg>
                        </div>
                    </div>
                    <OrderInfo order={order}/>
                </div>
            </div>
        </div>
    )
        ;
}

export default OrderCalculationInfoPage;