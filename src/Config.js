import DashboardIcon from '@mui/icons-material/Dashboard';
import SaveAltTwoToneIcon from '@mui/icons-material/SaveAlt';
import ReplyAllTwoToneIcon from '@mui/icons-material/Replay';
import LockOpenTwoToneIcon from '@mui/icons-material/Lock';
import HistoryTwoToneIcon from '@mui/icons-material/History';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';



export const BASE_URL="http://192.168.222.70:5001/api";

const menuItems =[
    
    {
        label:"Dashboard",
        path:"/dashboard",
        icon:<DashboardIcon/>,
        id:"menu-dash",
        
    },
    {
        label:"Assigned to Me",
        path:"/assigntome",
        icon:<SaveAltTwoToneIcon/>,
        id:"menu-assign"
    },
    {
        label:"Pending Acknowledge",
        path:"/pending",
        icon:<ReplyAllTwoToneIcon/>,
        id:"menu-pending"
    },
    {
        label:"Take From Locker",
        path:"/takefromlocker",
        icon:<LockOpenTwoToneIcon/>,
        id:"menu-take"
    },
    {
        label:"History",
        path:"/history",
        icon:<HistoryTwoToneIcon/>,
        id:"menu-history"
    },
    {
        label:"Change Password",
        path:"/change",
        icon:<LockTwoToneIcon/>,
        id:"menu-change"
    },
    

]


export default menuItems;