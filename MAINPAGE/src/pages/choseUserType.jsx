import { Button, Card, CardBody, CardFooter, CardHeader, Radio, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import {motion} from 'framer-motion'
const ChoseUserType = () => {

    const [cardNum,setCardNum] = useState(0)
    const [userType,setUserType] = useState(0)

  return (<>

  {
cardNum == 0?  

(
    <motion.div key={3}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        >
      <div className='pt-32 sm:w-full lg:w-1/2'>
        <Card>
            <CardHeader>
                <Typography variant='h4' className='p-6 text-primary'>
                What are you looking for in this System?
                </Typography>
            </CardHeader>
            <CardBody>
                <div className='p-6 flex'>
     <div className="flex gap-10">
       <Radio name="type" onClick={e=>setUserType(1)} label="I work as an employee" className='text-primary' />
       <Radio name="type" onClick={e=>setUserType(2)} label="I am here to develop the company's HRMS" className='text-primary'   />
     </div>
                </div>
            </CardBody>
        <CardFooter className='border-primary border-t-2 mt-6'>
            <Button onClick={e=>{if(userType == 1)setCardNum(1); else if(userType == 2)setCardNum(2)}} className='px-6 bg-primary'>Next</Button>
        </CardFooter>
        </Card>
    </div>
    </motion.div>
    )
:
cardNum == 1?
(
    <motion.div key={903}
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    exit={{ x: -100 }}
    >
<div className='pt-32 sm:w-full lg:w-1/2'>
<Card>
    <CardHeader>
        <Typography variant='h4' className='p-6 text-primary'>
        Please provide relevant information to complete the employee registration process.
                </Typography>
    </CardHeader>
    <CardBody>
        <div className='p-6 flex'>
<div className="flex gap-10">

</div>
        </div>
    </CardBody>
<CardFooter className='border-primary border-t-2 mt-6'>
    <Button className='px-6 bg-primary'>Next</Button>
</CardFooter>
</Card>
</div>
</motion.div>
)
:<></>
}
    </>
  )
}

export default ChoseUserType