import { Birthdays } from "../dashboard/birthdays/Birthdays"
import { Timers } from "../dashboard/timer/Timers"
import { DayModal } from "../dashboard/calendar/DayModal"
import { EventModal } from "../dashboard/calendar/EventModal"

import { useState,useContext,createContext} from "react";
import { composeElement } from "utils";
import { NoteIcon } from "../assets/icons/note";
import { Present } from "../assets/icons/preset";

const CalendarTabs = [
  {
    label: 'events',
    icon: (<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" pid="mbi2zci2-023KZLQ5HOD5">
<path fill="#241d1d" d="M18.5 2h-2.5v-0.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v0.5h-10v-0.5c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v0.5h-2.5c-0.827 0-1.5 0.673-1.5 1.5v14c0 0.827 0.673 1.5 1.5 1.5h17c0.827 0 1.5-0.673 1.5-1.5v-14c0-0.827-0.673-1.5-1.5-1.5zM1.5 3h2.5v1.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-1.5h10v1.5c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-1.5h2.5c0.276 0 0.5 0.224 0.5 0.5v2.5h-18v-2.5c0-0.276 0.224-0.5 0.5-0.5zM18.5 18h-17c-0.276 0-0.5-0.224-0.5-0.5v-10.5h18v10.5c0 0.276-0.224 0.5-0.5 0.5z" pid="mbi2zci2-02BZ098CCKPO"></path>
<path fill="#241d1d" d="M7.5 10h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-02BQO8GRDAKC"></path>
<path fill="#241d1d" d="M10.5 10h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-01XBZTJ9WLTC"></path>
<path fill="#241d1d" d="M13.5 10h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-00BEGC1I1YUX"></path>
<path fill="#241d1d" d="M16.5 10h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-024FE4DZW44N"></path>
<path fill="#241d1d" d="M4.5 12h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-01F7SXOP8HPD"></path>
<path fill="#241d1d" d="M7.5 12h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-00J8UTDTECFK"></path>
<path fill="#241d1d" d="M10.5 12h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-020FMVDN0PQ0"></path>
<path fill="#241d1d" d="M13.5 12h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-00369XVI2HPQ"></path>
<path fill="#241d1d" d="M16.5 12h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-01X3G6SKRUF8"></path>
<path fill="#241d1d" d="M4.5 14h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-01J3M1KT3C7Q"></path>
<path fill="#241d1d" d="M7.5 14h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-029JD56T88L3"></path>
<path fill="#241d1d" d="M10.5 14h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-00S0XSUFOZTY"></path>
<path fill="#241d1d" d="M13.5 14h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-00E4C4JK1BHR"></path>
<path fill="#241d1d" d="M16.5 14h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-005KBM5WNDD4"></path>
<path fill="#241d1d" d="M4.5 16h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-00N8N9FTGTAV"></path>
<path fill="#241d1d" d="M7.5 16h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-002TAXGLBRCY"></path>
<path fill="#241d1d" d="M10.5 16h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-00YTROD5DHET"></path>
<path fill="#241d1d" d="M13.5 16h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-01TNX2DMW9XI"></path>
<path fill="#241d1d" d="M16.5 16h-1c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z" pid="mbi2zci2-01Q6XYG6ZYSF"></path>
</svg>),
    element: composeElement(EventModal),
    buttonType: 'inline',
    id:3,
  },
        {
    label: 'notes',
    icon:(<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="-8 -8 78 78" enable-background="new 0 0 64 64" xml:space="preserve" pid="mbi2zcep-002TB2QA65BF">
            <rect x="4" y="3" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" width="40" height="58" pid="mbi2zcep-00T5AF0HISIU"></rect>
            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="34" y1="3" x2="34" y2="60" pid="mbi2zcep-01YA6X9KLZI5"></line>
            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="8" y1="16" x2="0" y2="16" pid="mbi2zcep-02B3EX0KOZO2"></line>
            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="8" y1="8" x2="0" y2="8" pid="mbi2zcep-009BDRZXAB41"></line>
            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="8" y1="24" x2="0" y2="24" pid="mbi2zcep-00UMTUYY5ZDI"></line>
            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="8" y1="32" x2="0" y2="32" pid="mbi2zcep-002OUBB0HNWE"></line>
            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="8" y1="40" x2="0" y2="40" pid="mbi2zcep-01NQKY3EV9TJ"></line>
            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="8" y1="48" x2="0" y2="48" pid="mbi2zcep-01IFOYGDKWU6"></line>
            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="8" y1="56" x2="0" y2="56" pid="mbi2zcep-00C33R60WDHM"></line>
            <polygon fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="55,1 55,54 59,62 63,54 63,1 " pid="mbi2zcep-024EWO1WVSNS"></polygon>
            <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="55" y1="11" x2="63" y2="11" pid="mbi2zcep-02BZPK9XQBUK"></line>
            </svg>),
    element: (props) => <div className="notes"></div>,
    buttonType: 'inline',
    index: 5,
  },
  {
    label: 'timers',
    icon: (<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="-2 -2 24 24" pid="mbi2zci3-006P5UMLXQXI">
<path fill="#241d1d" d="M16.32 17.113c1.729-1.782 2.68-4.124 2.68-6.613 0-2.37-0.862-4.608-2.438-6.355l0.688-0.688 0.647 0.646c0.098 0.098 0.226 0.146 0.353 0.146s0.256-0.049 0.353-0.146c0.195-0.195 0.195-0.512 0-0.707l-2-2c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l0.647 0.646-0.688 0.688c-1.747-1.576-3.985-2.438-6.355-2.438s-4.608 0.862-6.355 2.438l-0.688-0.688 0.646-0.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-2 2c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l0.646-0.646 0.688 0.688c-1.576 1.747-2.438 3.985-2.438 6.355 0 2.489 0.951 4.831 2.68 6.613l-2.034 2.034c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.147 0.354 0.147s0.256-0.049 0.354-0.147l2.060-2.059c1.705 1.428 3.836 2.206 6.087 2.206s4.382-0.778 6.087-2.206l2.059 2.059c0.098 0.098 0.226 0.147 0.354 0.147s0.256-0.049 0.353-0.147c0.195-0.195 0.195-0.512 0-0.707l-2.034-2.034zM1 10.5c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5c0 4.687-3.813 8.5-8.5 8.5s-8.5-3.813-8.5-8.5z" pid="mbi2zci3-00O8G0JF6BUT"></path>
<path fill="#241d1d" d="M15.129 7.25c-0.138-0.239-0.444-0.321-0.683-0.183l-4.92 2.841-3.835-2.685c-0.226-0.158-0.538-0.103-0.696 0.123s-0.103 0.538 0.123 0.696l4.096 2.868c0.001 0.001 0.002 0.001 0.002 0.002 0.009 0.006 0.018 0.012 0.027 0.017 0.002 0.001 0.004 0.003 0.006 0.004 0.009 0.005 0.018 0.010 0.027 0.015 0.002 0.001 0.004 0.002 0.006 0.003 0.010 0.005 0.020 0.009 0.031 0.014 0.006 0.003 0.013 0.005 0.019 0.007 0.004 0.001 0.008 0.003 0.013 0.005 0.007 0.002 0.014 0.004 0.021 0.006 0.004 0.001 0.008 0.002 0.012 0.003 0.007 0.002 0.014 0.003 0.022 0.005 0.004 0.001 0.008 0.002 0.012 0.002 0.007 0.001 0.014 0.002 0.021 0.003 0.005 0.001 0.010 0.001 0.015 0.002 0.006 0.001 0.012 0.001 0.018 0.002 0.009 0.001 0.018 0.001 0.027 0.001 0.002 0 0.004 0 0.006 0 0 0 0-0 0-0s0 0 0.001 0c0.019 0 0.037-0.001 0.056-0.003 0.001-0 0.002-0 0.003-0 0.018-0.002 0.036-0.005 0.054-0.010 0.002-0 0.003-0.001 0.005-0.001 0.017-0.004 0.034-0.009 0.050-0.015 0.003-0.001 0.006-0.002 0.008-0.003 0.016-0.006 0.031-0.012 0.046-0.020 0.004-0.002 0.007-0.004 0.011-0.006 0.005-0.003 0.011-0.005 0.016-0.008l5.196-3c0.239-0.138 0.321-0.444 0.183-0.683z" pid="mbi2zci3-0165XZB1T8M4"></path>
</svg>),
    element: composeElement(Timers),
    buttonType: 'inline',
    id: 2,
  }, 

  {
    label:'birthdays',
    icon: (<svg class="preset" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="-1 -2 26 26" pid="m9ui3rf5-009QNJF89BIE"><path fill-rule="evenodd" d="M3.75 3.75c0 .844.279 1.623.75 2.25H2.75A1.75 1.75 0 001 7.75v2.5c0 .698.409 1.3 1 1.582v8.418c0 .966.784 1.75 1.75 1.75h16.5A1.75 1.75 0 0022 20.25v-8.418c.591-.281 1-.884 1-1.582v-2.5A1.75 1.75 0 0021.25 6H19.5a3.75 3.75 0 00-3-6c-1.456 0-3.436.901-4.5 3.11C10.936.901 8.955 0 7.5 0a3.75 3.75 0 00-3.75 3.75zM11.22 6c-.287-3.493-2.57-4.5-3.72-4.5a2.25 2.25 0 000 4.5h3.72zm9.28 6v8.25a.25.25 0 01-.25.25h-7.5V12h7.75zm-9.25 8.5V12H3.5v8.25c0 .138.112.25.25.25h7.5zm10-10a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-8.5v3h8.5zm-18.5 0h8.5v-3h-8.5a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25zm16-6.75A2.25 2.25 0 0116.5 6h-3.72c.287-3.493 2.57-4.5 3.72-4.5a2.25 2.25 0 012.25 2.25z" fill="#241d1d" pid="m9ui3rf5-00F2V3FAWTFX"></path></svg>),
    element: composeElement(Birthdays),
    buttonType: 'inline',
    id:1,
  },

  {
    label: 'dayview',
    element: composeElement(DayModal),
    buttonType: 'floating',
    index: 4,
  },

]

const TabContext = createContext(null);

export const useTabState = () => useContext(TabContext)

export const TabProvider = ({children}) => {
  const [activeTab,setActiveTab] = useState(0)
  // const Tabs = CalendarTabs
  return (
    <TabContext.Provider value={{ activeTab , setActiveTab, Tabs:CalendarTabs }}>
        {children}
    </TabContext.Provider>
  )
}
