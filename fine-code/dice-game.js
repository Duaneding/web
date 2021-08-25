function getResult(){
    let round = 0,funds = 50;

    function rand(m,n){
        return Math.floor(Math.random() * (n - m + 1)) + m;
    }
    function randFace(){
        return [1,2,3,4,5,6][rand(1,6)];
    }
    while( 1< funds && funds < 100){
        round++;
        let bets = {1:0,2:0,3:0,4:0,5:0,6:0};
        total_bet = rand(1,funds);
        if(total_bet == 7){
            total_bet = funds;
            bets[4] = funds; 
        }else{
            let = remaining = total_bet;
            do{
                let bet = rand(1,remaining);
                let face = randFace();
                bets[face] = bet;
                remaining -= bet; 
            }while(remaining > 0)
        }
        funds -= total_bet;
        for(let i = 0;i < 3;i++){
            let res = bets[randFace()]
            if(res)funds += res;
        }
    }
    console.log('------',round,funds)
}
