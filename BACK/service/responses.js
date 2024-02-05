module.exports = {
    //Message responses dynamic modules

    ERROR_FOUND:(msg,res)=>res.status(400).json({msg:msg}),
    NOT_FOUND_MSG:(msg,res)=>res.status(404).json({msg:msg}),
    SUCCESS_MSG:(msg,res)=>res.status(200).json({msg:msg}),
    RES_RESULT:(data,res)=>res.status(200).json(data),

    //Message response static modules
    BLOCK_ACCESS:(res)=>res.status(403).json({msg:"Unauthorized access"}),
    SERVER_ERROR:(res)=>res.status(500).json({msg:"Server error"})

}