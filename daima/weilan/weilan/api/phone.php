
<?php
/*
    ***聚合数据（JUHE.CN）短信API服务接口PHP请求示例源码
    ***DATE:2015-05-25
*/
header('content-type:text/html;charset=utf-8');
$rg = isset($_REQUEST['rg']) ? $_REQUEST['rg'] : "";
$phone = isset($_REQUEST['phone']) ? $_REQUEST["phone"] : '';
$sendUrl = 'http://v.juhe.cn/sms/send'; //短信接口的URL
$phone = $phone * 1;
$rg = $rg * 1;
$smsConf = array(
    'key'   => 'c7b55e382e579427957288069f9ee63f', //您申请的APPKEY
    'mobile'    => $phone, //接受短信的用户手机号码
    'tpl_id'    => '184382', //您申请的短信模板ID，根据实际情况修改
    'tpl_value' => '#code#=' . $rg //您设置的模板变量，根据实际情况修改
);

$content = juhecurl($sendUrl, $smsConf, 1); //请求发送短信

if ($content) {
    $result = json_decode($content, true);
    $error_code = $result['error_code'];
    if ($error_code == 0) {
        //状态为0，说明短信发送成功
        echo "短信发送成功,短信ID：" . $result['result']['sid'];
    } else {
        //状态非0，说明失败
        $msg = $result['reason'];
        echo "短信发送失败(" . $error_code . ")：" . $msg;
    }
} else {
    //返回内容异常，以下可根据业务逻辑自行修改
    echo "请求发送短信失败";
}
function juhecurl($url, $params = false, $ispost = 0)
{
    $httpInfo = array();
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22');
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    if ($ispost) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_URL, $url);
    } else {
        if ($params) {
            curl_setopt($ch, CURLOPT_URL, $url . '?' . $params);
        } else {
            curl_setopt($ch, CURLOPT_URL, $url);
        }
    }
    $response = curl_exec($ch);
    if ($response === FALSE) {
        //echo "cURL Error: " . curl_error($ch);
        return false;
    }
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $httpInfo = array_merge($httpInfo, curl_getinfo($ch));
    curl_close($ch);
    return $response;
}
