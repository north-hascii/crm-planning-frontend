import React from 'react';
import {appRoutes} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {deleteOperationById} from "../../http/operationApi";

function OperationTable({tableItems = []}) {
    const navigate = useNavigate()

    const deleteTableItem = (item) => {
        deleteOperationById(item?.id).then(data => {
            alert('Операция успешно удалена.')
            window.location.reload()
        }).catch(err => {
            console.log(err)
            alert('Не удалось удалить операцию.')
        })
    }
    const redirectToEditor = (item) => {
        navigate(`${appRoutes.admin.ADMIN_OPERATION_ROUTE}/${item?.id}`)
    }

    return (
        <table className={`admin-table rounded-corners`}>
            <tbody>
            <tr className={'admin-table-col-names'}>
                <th className={'admin-table-col small'}>
                    id
                </th>
                <th className={'admin-table-col'}>
                    Название операции
                </th>
                <th className={'admin-table-col'}>
                    Материалы
                </th>
                <th className={'admin-table-col'}>
                    Специальности
                </th>
                <th className={'admin-table-col'}>
                    Время выполнения
                </th>
                <th className={'admin-table-col medium'}>
                </th>
            </tr>

            {tableItems && tableItems.map((item, index) => {
                return (<tr key={index}>
                    <th className={'admin-table-col small'}>
                        {item?.id}
                    </th>
                    <th className={'admin-table-col'}>
                        {item?.operation_name}
                    </th>
                    <th className={'admin-table-col'}>
                        {item?.resource_list?.map(resource => resource?.material?.material_name).join('; ')}
                    </th>
                    <th className={'admin-table-col'}>
                        {item?.specialty_list?.map(resource => resource?.specialty_name).join('; ')}
                    </th>
                    <th className={'admin-table-col'}>
                        {item?.duration}
                    </th>
                    <th className={'admin-table-col medium'}>
                        <div className={'col-buttons-container'}>
                            <svg onClick={() => redirectToEditor(item)} width="20" height="19"
                                 viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M16.3296 0.0725714C16.0404 0.14874 15.9064 0.209638 15.6487 0.381876C15.4836 0.49232 7.01841 8.95678 6.87479 9.15512C6.79665 9.26302 5.65341 13.3433 5.65367 13.5134C5.65396 13.7235 5.89593 13.9625 6.1084 13.9625C6.27044 13.9625 10.3367 12.8091 10.4395 12.734C10.4946 12.6937 12.4568 10.7316 14.8 8.37375C17.9113 5.24293 19.1015 4.02195 19.2129 3.84669C19.4878 3.41454 19.6029 2.83783 19.5159 2.32884C19.4907 2.18102 19.407 1.93467 19.3203 1.7531C19.1843 1.46825 19.115 1.38174 18.6442 0.908634C18.1727 0.434783 18.0878 0.366194 17.8039 0.2298C17.3022 -0.0112514 16.8364 -0.0609103 16.3296 0.0725714ZM17.408 1.08681C17.6109 1.18971 18.3648 1.94938 18.4768 2.16381C18.5511 2.30592 18.5647 2.38653 18.5651 2.68654C18.5657 3.13683 18.4974 3.28214 18.0759 3.72777L17.7717 4.04936L16.6452 2.91736L15.5187 1.78536L15.846 1.47277C16.026 1.30086 16.2473 1.12426 16.3377 1.08027C16.6594 0.923756 17.0918 0.926407 17.408 1.08681ZM2.30939 1.92515C1.53173 2.13495 0.934619 2.69322 0.658134 3.46898L0.544434 3.78799V10.4154C0.544434 16.7377 0.547555 17.0531 0.61258 17.2648C0.749577 17.7109 0.899134 17.9601 1.23139 18.2961C1.46485 18.5321 1.6182 18.6513 1.81691 18.7509C2.35952 19.0229 1.82635 19.0063 9.66647 18.9948L16.7077 18.9844L16.9582 18.8864C17.6883 18.601 18.2038 18.072 18.4456 17.3602C18.5269 17.1209 18.5282 17.0833 18.5398 14.7092C18.5503 12.5461 18.5454 12.2893 18.4913 12.1863C18.4117 12.035 18.2549 11.9462 18.067 11.9462C17.9449 11.9462 17.8864 11.9719 17.7754 12.074L17.6366 12.2018L17.6181 14.5663C17.5996 16.922 17.5992 16.9316 17.5145 17.142C17.3611 17.5234 17.0746 17.8113 16.6951 17.9655L16.4848 18.0509L9.66874 18.0609C5.16985 18.0674 2.78329 18.0579 2.64849 18.0329C2.20085 17.9497 1.80383 17.6436 1.6173 17.2378L1.51052 17.0055V10.4341V3.86267L1.61831 3.62811C1.75519 3.3302 2.07188 3.02657 2.37311 2.9044L2.58807 2.81722L4.92896 2.79855C7.5437 2.77771 7.39748 2.79377 7.53021 2.51269C7.61574 2.33157 7.57717 2.15776 7.41547 1.99523L7.28594 1.86511L4.89986 1.86757C2.91843 1.86959 2.47909 1.87937 2.30939 1.92515ZM15.9833 3.60142L17.079 4.70299L13.6144 8.18445L10.1497 11.666L9.0535 10.5649C8.45055 9.95926 7.95725 9.44691 7.95725 9.42626C7.95725 9.37716 14.8012 2.49985 14.85 2.49985C14.8706 2.49985 15.3806 2.99554 15.9833 3.60142ZM9.21152 12.1298C9.07709 12.175 6.82415 12.799 6.81795 12.7927C6.81393 12.7887 6.92678 12.3656 7.06868 11.8524C7.21062 11.3393 7.36222 10.7875 7.40558 10.6262L7.48447 10.3329L8.37133 11.2235C8.86046 11.7147 9.23727 12.1211 9.21152 12.1298Z"
                                      fill="#4C4C4C"/>
                            </svg>
                            <svg onClick={() => deleteTableItem(item)} width="20" height="19"
                                 viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M7.53837 0.0226604C7.20952 0.087583 6.98194 0.356853 6.98141 0.681657C6.98096 0.962039 7.10175 1.16928 7.34377 1.30334L7.47211 1.37442H9.9986H12.5251L12.6237 1.32169C12.8835 1.18267 12.9952 1.01482 13.0111 0.73918C13.0205 0.578107 13.0139 0.535982 12.9622 0.422997C12.858 0.195324 12.6942 0.0693347 12.4398 0.0210798C12.2866 -0.00796894 7.68605 -0.00648413 7.53837 0.0226604ZM1.0223 1.51772C0.405384 1.71026 0.378922 2.58034 0.98291 2.81328C1.09951 2.85823 1.28722 2.85919 10.0106 2.85919H18.9192L19.044 2.80272C19.2092 2.72805 19.3675 2.55653 19.4216 2.39371C19.5116 2.1226 19.417 1.8023 19.1974 1.63459C18.9805 1.46897 19.7773 1.48202 9.98826 1.48379C2.61797 1.48513 1.10849 1.49083 1.0223 1.51772ZM2.33594 4.11015C2.18828 4.16226 1.99595 4.35868 1.94437 4.51008C1.92229 4.57486 1.90423 4.67841 1.90423 4.74017C1.90423 4.80193 2.16737 7.60998 2.48897 10.9803C2.81056 14.3506 3.08103 17.193 3.08996 17.2966C3.15987 18.106 3.69546 18.7369 4.4906 18.9464L4.69416 19H10.0106C15.1257 19 15.3333 18.9983 15.4946 18.9553C16.0688 18.8021 16.5236 18.4296 16.7522 17.9255C16.8481 17.7139 16.8909 17.53 16.9192 17.2081C16.9327 17.0541 17.203 14.226 17.5198 10.9234C17.8677 7.29754 18.0926 4.85229 18.0875 4.75107C18.0775 4.55398 18.0251 4.43177 17.8947 4.30135C17.702 4.10859 17.3943 4.05236 17.1404 4.16343C16.9727 4.23679 16.811 4.41625 16.765 4.58017C16.746 4.64783 16.4605 7.53201 16.1307 10.9895C15.5973 16.58 15.5254 17.2867 15.4813 17.3742C15.4264 17.4832 15.3448 17.5525 15.2217 17.595C15.1604 17.6161 13.8669 17.6229 9.98905 17.6225C5.05831 17.622 4.83372 17.6201 4.74184 17.5784C4.62705 17.5262 4.50068 17.3892 4.48092 17.2955C4.47309 17.2583 4.19757 14.3991 3.86865 10.9416C3.4714 6.76561 3.25752 4.61171 3.23152 4.52548C3.18036 4.35573 2.99685 4.16631 2.82773 4.10869C2.68278 4.05931 2.47829 4.05991 2.33594 4.11015ZM7.24929 5.69844C7.09562 5.77524 6.98702 5.8888 6.91498 6.04813C6.87602 6.13429 6.87341 6.41008 6.87341 10.4524V14.7646L6.94568 14.906C7.20243 15.408 7.92304 15.4035 8.17112 14.8983L8.23844 14.7613V10.4507C8.23844 6.40998 8.23583 6.13429 8.19686 6.04813C8.07791 5.78511 7.83554 5.62516 7.55592 5.62516C7.42538 5.62516 7.36896 5.63865 7.24929 5.69844ZM12.1634 5.68252C12.0117 5.75316 11.8927 5.87005 11.8169 6.02282L11.7588 6.14004V10.4507V14.7613L11.8102 14.8726C11.8726 15.0076 12.0142 15.1537 12.1427 15.2159C12.196 15.2417 12.3079 15.2661 12.3974 15.2716C12.6969 15.2898 12.9287 15.1586 13.0565 14.8983L13.1238 14.7613L13.13 10.4996C13.1355 6.78424 13.1317 6.22218 13.1006 6.1153C12.9862 5.72172 12.5308 5.51146 12.1634 5.68252Z"
                                      fill="#4C4C4C"/>
                            </svg>
                        </div>
                    </th>
                </tr>)
            })
            }
            </tbody>
        </table>
    )
}

export default OperationTable;