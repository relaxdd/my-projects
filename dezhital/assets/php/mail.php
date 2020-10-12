<?php 
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

	require 'PHPMailer/src/Exception.php';
	require 'PHPMailer/src/PHPMailer.php';
	require 'PHPMailer/src/SMTP.php';

	$data = $_POST;
	$user_message;
	$user_reason;

	if( !empty($data['reason-call']) ){
		$user_reason = '
		<p style="margin: 0; color: #333;">Примечание - '. $data['reason-call']. '</p>';
	}
	
	if( !empty($data['user-message']) ){
		$user_message = '
		<p style="margin: 0; margin-bottom: 7px; color: #333;">Сообщение - '. $data['user-message']. ',</p>
		<small style="color: #333;">Примечание говорит о том что пользователь заказал обратный звонок через модальное окно выбрав интересующий товар<small/>';

	}

	$mailBody = '
	<h3 style="text-align: left; font-size: 18px; color: #333;">На сайте Дежиталь появилась заявка на обратный звонок</h3>
	<div style="color:#333;margin: 0 auto;">
		<p style="margin: 0;margin-bottom: 7px;color: #333;">Имя отправителя - '. $data['user-name']. ',</p>
		<p style="margin: 0;margin-bottom: 7px;color: #333;">Номер телефона - <a href="tel:'. $data['user-phone']. '" style="color: black; text-decoration: none;">'. $data['user-phone']. '<a/>,</p>
		'. $user_message .'
		<p style="margin: 0; margin-bottom: 7px; color: #333;">Дата отправки - '.  date("d.m.Y"). ',</p>
		<p style="margin: 0; margin-bottom: 7px; color: #333;">Время отправки - '.  date("H:i"). ' (МСК),</p>'
		. $user_reason. '
	</div>';

	$mail = new PHPMailer(true);

	try {
		//Server settings
		$mail->isSMTP();
		$mail->Host ='smtp.mail.ru';
		$mail->SMTPAuth = true;
		$mail->CharSet = "utf-8";
		$mail->Username ='awenn2019@mail.ru';
		$mail->Password ='awennty2020modern2';
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
		$mail->Port = 465;

		//Recipients
		$mail->setFrom('awenn2019@mail.ru', 'Dedhital');
		$mail->addAddress('awenn2015@gmail.com');
		
		$mail->isHTML(true);
		
		$mail->Subject = 'Заявка на обратный звонок';
		$mail->Body = $mailBody;
		echo 'message has been sent';
		$mail->send();
	}

	catch (Exception $e) {
		echo "Message could not be sent. Mailer Error:". $mail->ErrorInfo;
	}

?>
