import React, {useState, useEffect} from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';
import AddBuilding from "./components/AddBuilding";
import axios from 'axios';


const App = ({data}) => {
    const [filterText, setFilterText] = useState('');
    const [selectedBuildingId, setBuildingSelectedId] = useState(0);
    const [objectId, setObjectId] = useState("");
    const [currentAppData, setCurrentAppData] = useState(data);
    const [building, setBuilding] = useState(data);

    
    useEffect(() => {
        axios.get('http://localhost:5000/api/listings/')
            .then(response => {
                setCurrentAppData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    return (
        <div className="bg">
            <div className="row">
                <h1 style={{textAlign: "center",fontFamily: "Times New Roman", fontSize: "48px"}}>UF Directory App</h1>
            </div>
            <Search setFilterText={setFilterText}/>
            <main>
                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <tr>
                                    <td style={{textAlign:"left", fontSize: "36px", wordSpacing:"250px", fontFamily:"New Times Roman"}}>
                                        <b>Code Building</b>

                                    </td>

                                </tr>
                                <BuildingList data={data}
                                              filterText={filterText}
                                              setBuildingSelectedId={setBuildingSelectedId}
                                              selectedBuildingId={selectedBuildingId}
                                              setCurrentAppData = {setCurrentAppData}
                                              currentAppData = {currentAppData}
                                              setObjectId = {setObjectId}
                                              objectId = {objectId}
                                              setBuilding = {setBuilding}/>
                            </table>
                        </div>
                    </div>
                    <div className="column2">
                        {!selectedBuildingId ? (<ViewBuilding selectedBuildingId={0} />)
                            : (<ViewBuilding building={building} objectId = {objectId}/>)
                        }


                    </div>
                    <div>
                        <p style = {{fontAlign: "center", position:"absolute", right:"0", top:"200px"}}>
                            <AddBuilding setCurrentAppData = {setCurrentAppData}
                                         currentAppData = {currentAppData}
                                         selectedBuildingId = {selectedBuildingId}/>
                        </p>
                    </div>
                </div>
                <Credit/>
            </main>
        </div>
    );
};

export default App;
