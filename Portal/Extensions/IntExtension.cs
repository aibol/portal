// 转载请注明来自 http://www.shang11.com  

using System;
using System.Runtime.CompilerServices;

namespace Portal.Extensions
{
    public static class IntExtension
    {
        private static readonly string[] UpperResource = {"零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"};
        private static readonly string[] LowerResource = {"零", "一", "二", "三", "四", "五", "六", "七", "八", "九"};

        private static readonly string[] MUpperResource = { "", "拾", "佰", "仟" };
        private static readonly string[] MLowerResource = { "", "十", "百", "千" };

        private static readonly string[] BResource = { "", "万", "亿", "万亿" };

        public static string ToChinese(this int digitalNumber, bool toUpper = false)
        {
            var stringNumber = digitalNumber.ToString();

            // 数字转换为中文后的数组
            var pArrayNum = toUpper ? UpperResource : LowerResource;
            // 为数字位数建立一个位数组  
            var pArrayDigit = toUpper ? MUpperResource : MLowerResource;
            // 为数字单位建立一个单位数组  
            var pArrayUnits = BResource;
            // 返回值  
            var pStrReturnValue = string.Empty;
            // 字符位置指针
            var finger = 0;
            // 取模
            var pIntM = stringNumber.Length % 4;
            var pIntK = pIntM > 0
                ? stringNumber.Length / 4 + 1
                : stringNumber.Length / 4;

            // 外层循环,四位一组,每组最后加上单位: ",万亿,",",亿,",",万,"  
            for (var i = pIntK; i > 0; i--)
            {
                var pIntL = 4;
                if (i == pIntK && pIntM != 0)
                    pIntL = pIntM;

                // 得到一组四位数  
                var four = stringNumber.Substring(finger, pIntL);

                // 内层循环在该组中的每一位数上循环  
                var pIntR = four.Length;
                for (var j = 0; j < pIntR; j++)
                {
                    // 处理组中的每一位数加上所在的位  
                    var n = Convert.ToInt32(four.Substring(j, 1));
                    if (n == 0)
                    {
                        if (j < pIntR - 1 &&
                            Convert.ToInt32(four.Substring(j + 1, 1)) > 0 &&
                            !pStrReturnValue.EndsWith(pArrayNum[n]))
                            pStrReturnValue += pArrayNum[n];
                    }
                    else
                    {
                        if (!(n == 1 &&
                              pStrReturnValue.EndsWith(pArrayNum[0]) | (pStrReturnValue.Length == 0) &&
                              j == pIntR - 2))
                            pStrReturnValue += pArrayNum[n];

                        pStrReturnValue += pArrayDigit[pIntR - j - 1];
                    }
                }

                finger += pIntL;

                // 每组最后加上一个单位:",万,",",亿," 等  
                // 如果不是最高位的一组
                if (i < pIntK) 
                {
                    if (Convert.ToInt32(four) != 0)
                        // 如果所有4位不全是0则加上单位",万,",",亿,"等  
                        pStrReturnValue += pArrayUnits[i - 1];
                }
                else
                {
                    // 处理最高位的一组,最后必须加上单位  
                    pStrReturnValue += pArrayUnits[i - 1];
                }
            }

            return pStrReturnValue;
        }
    }
}