import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from "axios";
import Loaders from "../Utillities/loaders";

const Collection = () => {
    const [datas, setDatas] = useState([])
    const [limit, setLimit] = useState(3)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isCancelled = false
        if (isCancelled === false) {
            setLoading(true)
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_BASEURL}/photos?_limit=${limit}`
            }).then((result) => setDatas(result.data)).catch((err) => console.log(err)).finally(() =>
                setLoading(false))
        }
        // Clean up Render
        return () => { isCancelled = true }
    }, [limit])

    const handleLimit = (option) => {
        option === "+" ? setLimit((prev) => prev + 1) : setLimit((prev) => prev - 1)
    }

    if (loading) return <Loaders />

    return (
        <React.Fragment>
            <Carousel>
                {/* Carousel items start */}
                {datas.map((data, i) => {
                    return (
                        <Carousel.Item key={i}>
                            <img
                                className="d-block w-100"
                                src={data.url}
                                alt="First slide"
                                height={450}
                                width={4}
                            />
                            <Carousel.Caption>
                                <h3>{data.title}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}

                {/* Carousel items end */}
            </Carousel>
            <ButtonGroup className="d-flex justify-content-center align-items-center mt-2">
                <Button className="btn btn-outline-primary" onClick={() => handleLimit("+")}>+</Button>
                {
                    limit > 1 &&
                    <Button className="btn btn-outline-primary" onClick={() => handleLimit("-")}>-</Button>
                }
            </ButtonGroup>
        </React.Fragment>
    )
}

export default Collection