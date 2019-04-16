var bowl = '5/-5/-5/-5/-5/-5/-5/-5/-5/-5/-5'
// '45-54-63-36-27-09-81-18-90-72'
// 'X-5/-54-63-36-27-09-81-18-90'
// 'X-X-X-X-X-X-X-X-X-XX'
//'5/-5/-5/-5/-5/-5/-5/-5/-5/-5/-5'

function bowling(roll) {
  let rolled = (roll.replace(/-/gi,"")).split('')
  let rolls = []

  //function assigns integer to strikes and spars
  for(let i=0; i<rolled.length; i++){
    if(rolled[i] === 'X'){
      rolls.push(10)
    } else if(rolled[i] === '/'){
      rolls.push(10-parseInt(rolled[i-1]))
    } else if (typeof rolled[i] === 'string'){
        if(parseInt(rolled[i]) !== NaN){
          rolls.push(parseInt(rolled[i]))
        }
    }
  }

	var arr = [];
  //function assigns each frame value pairs
    for(let i=0; i<9; i++){
		if (rolls[0]===10) {
			rolls.splice(0,1);
			arr.push([10,0]);
		} else {
		arr.push(rolls.splice(0,2));
		}
	}
  //function breaks down rolls and scores in order to best identify score for spars and strikes
	var arr2 = arr.map((frameValuePair) => {
		return {
			rolls: frameValuePair,
			score: frameValuePair.reduce((prev,current) => {return prev+current;},0)
		};
	});

//function compares rolls and score to distinguish each frames value
	arr2 = arr2.map((bowlObj) => {
		if (arr2.indexOf(bowlObj) < 7) {
			if (bowlObj.score === 10) {
				//if frame score is 10 and one of the rolls is 10, add score of next two rolls (total of next frame)
				if (bowlObj.rolls.includes(10)) {
					var res = [];
					arr2.slice(arr2.indexOf(bowlObj)+1,arr2.indexOf(bowlObj)+3).forEach((e) => {
						e.rolls.forEach((f) => {
							if (res.length < 2) {
								res.push(f);
							}
						});
					});
					return res.reduce((prev,curr) => {return prev+curr},bowlObj.score);
					//needs to add the next two rolls if frame score is 10 and neither roll is 10, add score of next roll
				} else {
					var res2 = [];
					arr2.slice(arr2.indexOf(bowlObj)+1,arr2.indexOf(bowlObj)+2).forEach((e) => {
						e.rolls.forEach((f) => {
							if (res2.length < 1) {
								res2.push(f);
							}
						});
					});
          console.log(res2.reduce((prev,curr) => {return prev+curr},bowlObj.score))
					return res2.reduce((prev,curr) => {return prev+curr},bowlObj.score);

				}
			} else {
				return bowlObj.score;
			}
		} else if (arr2.indexOf(bowlObj) === 7) {
			if (bowlObj.score === 10) {
				if (bowlObj.rolls.includes(10)) {
					var res3 = [];
					arr2.slice(arr2.indexOf(bowlObj)+1,arr2.indexOf(bowlObj)+2).forEach((e) => {
						e.rolls.forEach((f) => {
							if (res3.length < 1) {
								res3.push(f);
							}
						});
					});
					res3.push(rolls.slice(0,1).reduce((prev,curr) =>{return prev+curr}));
					return res3.reduce((prev,curr) => {return prev+curr},bowlObj.score);
				} else {
					var res4 = [];
					arr2.slice(arr2.indexOf(bowlObj)+1,arr2.indexOf(bowlObj)+2).forEach((e) => {
						e.rolls.forEach((f) => {
							if (res4.length < 1) {
								res4.push(f);
							}
						});
					});
					return res4.reduce((prev,curr) => {return prev+curr},bowlObj.score);
				}
			} else {
				return bowlObj.score;
			}
		} else {
			if (bowlObj.score === 10) {
				if (bowlObj.rolls.includes(10)) {
					return bowlObj.score+rolls.slice(0,2).reduce((prev,curr) => {return prev+curr});
				} else {
          // console.log(bowlObj.score+rolls.slice(0,1).reduce((prev,curr) => {return prev+curr}))
					return bowlObj.score+rolls.slice(0,1).reduce((prev,curr) => {return prev+curr});
				}
			} else {
				return bowlObj.score;
			}
		}
	});
	// console.log(arr2);
  let total = 0
	rolls.forEach((lastRollValue) => {
    //pushes final roll into frame
    if(lastRollValue >= 10){
    total += lastRollValue
		arr2.push(total)
    } else {
      arr2.push(lastRollValue)
    }
	});

  const reducer = (accumulator, currentValue) => accumulator + currentValue
  console.log(arr2.reduce(reducer), 'score')
  return arr2.reduce(reducer)
};

bowling(bowl);
