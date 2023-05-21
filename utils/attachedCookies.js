
   const attachCookies = ({ res, token }) => {
   const oneDay = 1000 * 60  * 60 * 8 // 8 hours (converted from millisecond to hours)
    res.cookie('token', token,{
        httpOnly : true,
        expires:  new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })

    };

    export default attachCookies;