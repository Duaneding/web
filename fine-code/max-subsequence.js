function getResult(nums){
    //求前缀和
    let sums = [nums[0]];
    for(let i = 1;i < nums.length;i++){
        sums[i] = sums[i - 1] + nums[i];
    }
    //遍历前缀和，尝试每一种子序列之和，找到最大值
    let pre_min = max = sums[0];
    for(let i = 1;i < sums.length;i++){
        pre_min = Math.min(sums[i - 1],pre_min);
        if(pre_min >= 0)max = Math.max(max,sums[i]);
        else max = Math.max(max,sums[i] - pre_min);
    }
    return max;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
    let max = -Infinity,cur = 0;
    //把集合切分成若干个和趋近于0的子集，求解每个子集内和的最大值
    for(let x of nums){
        if(cur > 0){
            cur += x;
        }else{
            cur = x;
        }
        max = Math.max(max,cur);
    }
    return max;
};