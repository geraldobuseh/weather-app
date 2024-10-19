import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({onSearchChange}) => 
{

    const [search, setSearch] = useState(null);

    
    const loadOptions = async (inputValue) => {
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=250000&namePrefix=${inputValue}`;
    
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '84a12cdb04msh1e80c83b3092fc2p157f01jsn39d73bc4782c',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            },
        };
    
        try {
            // 1. Fetch the data
            const response = await fetch(url, options);
            
            // 2. Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
    
            // 3. Parse the response JSON
            const result = await response.json();
    
            // 4. Transform data into the format { options: [{ label, value }] }
            return {
                options: result.data.map((city) => ({
                    label: `${city.name}, ${city.countryCode}`, // e.g., "New York, US"
                    value: `${city.latitude}, ${city.longitude}`, // city ID as value
                })),
            };
        } catch (error) {
            // Handle any errors
            console.error('Error fetching cities:', error);
            return {
                options: [], // Return empty options if there's an error
            };
        }
    };
    
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData)
    }
    return (
        <AsyncPaginate
            placeholder="Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search; 