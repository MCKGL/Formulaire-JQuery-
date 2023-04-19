$( function() { // action au chargement du DOM

	//définit la fonction booléenne suivante qui envoie vrai si la valeur entrée correspond 
	//a l'expression régulière
	function validateEmail(email) {
		let emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return emailReg.test(email);
	}

	$('button[name="submit"]').on('click', function () {
		//On peut simplifier l'écriture grace à des variables qui reprennent chaque valeurs entrées
		//dans les différents input
		let name = $('#uName').val();
		let mail = $('#uMail').val();
		let sujet = $('#sujet').val();
		let message = $('#content').val();

		//Afficher à l'utilisateur "obligatoire" lorsqu'il ne remplit pas tout le formulaire
		//l'ajout de la classe 'error' permet de surligner les input en orange et rendre visible
		//l'erreur
		if ((name) === '' || (mail) === '' || (sujet) === '') {
			$('input').each(function () {
				if ($(this).val() === '') {
					$(this).prevAll('span').html(' (obligatoire)');
					$(this).addClass('error');
				} else {
					$(this).removeClass('error');
					$(this).prevAll('span').html('');
				}
			});
			//on test message à part car il ne s'agit pas d'un input
			if ((message) === '') {
				$('#content-info').html(' (obligatoire)');
				$('#content').addClass('error');
			} else {
				$('#content').removeClass('error');
				$('#content-info').html('');
			}
		}

		//Validation du formulaire. Si le formulaire est valide, on affiche les valeurs entrées
		//dans une alert et on remet le formulaire dans son aspect d'origine.
		if ((mail) != '') {
			if (validateEmail(mail)) {
				if ((name) != '' && (sujet) != '' && (message) != '') {
					$('input').val('');
					$('textarea').val('');
					$('input').prevAll('span').html('');
					$('input').removeClass('error');
					$('#content').removeClass('error');
					$('#content-info').html('');
					alert('Contenu du formulaire : \nNom : ' + name + '\n' + 'Email : ' + mail + '\n' 
					+ 'Sujet : ' + sujet + '\n' + 'Message : ' + message + '\n');
				}
			} else { //sinon on affiche "format de mail invalide"
				$('#uMail').addClass('error');
				$('#uMail').val('Format mail invalide');
			}
		}

	});

	//Le msg "format mail invalide" disparait quand l'utilisateur clique dans l'input mail
	$('#uMail').on('click', function () {
		if (($('#uMail').val()) === 'Format mail invalide') {
			$('#uMail').val('');
		}
	});

})
