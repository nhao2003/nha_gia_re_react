import { Route, Routes } from 'react-router-dom'
import { OthersInformation } from '../modules/personal/OthersInformation'
import { PersonalPage } from '../modules/personal/PersonalPage'
import { SearchPage } from '../modules/search/pages/SearchPage'


const Content: React.FC = () => {


    return (

        <Routes>
            <Route path='/personal' element={<PersonalPage />} />
            <Route path='/otheruser' element={<OthersInformation />} />
            <Route path='/search' element={<SearchPage />} />
        </Routes>


    )
}

export default Content
