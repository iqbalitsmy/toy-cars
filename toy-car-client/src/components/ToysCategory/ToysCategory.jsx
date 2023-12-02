import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ToyCard from '../ToyCard/ToyCard';


const ToysCategory = () => {
    const [toys, setToys] = useState([]);
    const [category, setCategory] = useState("Sports car");

    const handleOnClick = (value) => {
        setCategory(value);
    }
    // console.log(category)

    useEffect(() => {
        fetch(`http://localhost:5000/my-toys/${category}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setToys(data);
                // console.log(data);
            })
    }, [category]);

    return (
        <div className='mb-14'>
            <Tabs>
                <TabList>
                    <Tab onClick={() => handleOnClick('Sports car')}>Sports car</Tab>
                    <Tab onClick={() => handleOnClick('Truck car')}>Truck car</Tab>
                    <Tab onClick={() => handleOnClick('Regular car')}>Regular car</Tab>
                    <Tab onClick={() => handleOnClick('Mini fire truck')}>Mini fire truck</Tab>
                    <Tab onClick={() => handleOnClick('Mini police car')}>Mini police car</Tab>
                </TabList>
                <TabPanel>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {
                            toys.map(toy => (<ToyCard toy={toy} key={toy._id}></ToyCard>))
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {
                            toys.map(toy => (<ToyCard toy={toy} key={toy._id}></ToyCard>))
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {
                            toys.map(toy => (<ToyCard toy={toy} key={toy._id}></ToyCard>))
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {
                            toys.map(toy => (<ToyCard toy={toy} key={toy._id}></ToyCard>))
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {
                            toys.map(toy => (<ToyCard toy={toy} key={toy._id}></ToyCard>))
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ToysCategory;