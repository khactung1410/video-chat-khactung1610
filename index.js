const io = require('socket.io')(process.env.PORT || 3000);


const arrUserInfo = [];

io.on('connection',socket =>{
    socket.on('nguoi_dung_dang_ki',user =>{ //server nhận user đăng kí và cho nó vào mảng
        const isExist = arrUserInfo.some(u => u.name === user.name)
        socket.peerId = user.peerId;
        if(isExist){
            return socket.emit('dang_ki_that_bai');
        }
        arrUserInfo.push(user);
        socket.emit('danh_sach_online',arrUserInfo); //server gửi mảng các user
        socket.broadcast.emit('co_nguoi_dung_moi',user)
    });
    socket.on('disconnect',()=>{
        const index = arrUserInfo.findIndex(user => user.peerId === socket.peerId);
        arrUserInfo.splice(index,1);
        io.emit("ai-do-ngat-ket-noi",socket.peerId);
    })
});

