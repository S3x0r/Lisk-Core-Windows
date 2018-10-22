'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var jsonDescription = 'Prints output in JSON format. You can change the default behaviour in your config.json file.';

var messageDescription = 'Specifies a source for providing a message to the command. If a string is provided directly as an argument, this option will be ignored. The message must be provided via an argument or via this option. Sources must be one of `file` or `stdin`. In the case of `file`, a corresponding identifier must also be provided.\n\n\tNote: if both secret passphrase and message are passed via stdin, the passphrase must be the first line.\n\n\tExamples:\n\t- --message file:/path/to/my/message.txt\n\t- --message stdin\n';

var passphraseDescription = 'Specifies a source for your secret passphrase. Lisk Commander will prompt you for input if this option is not set.\n\n\tSource must be one of `prompt`, `pass`, `env`, `file` or `stdin`. For `pass`, `env` and `file` a corresponding identifier must also be provided.\n\n\tExamples:\n\t- --passphrase prompt (default behaviour)\n\t- --passphrase \'pass:my secret passphrase\' (should only be used where security is not important)\n\t- --passphrase env:SECRET_PASSPHRASE\n\t- --passphrase file:/path/to/my/passphrase.txt (takes the first line only)\n\t- --passphrase stdin (takes one line only)\n';

var secondPassphraseDescription = 'Specifies a source for your second secret passphrase. For certain commands a second passphrase is necessary, in which case Lisk Commander will prompt you for it if this option is not set. Otherwise, Lisk Commander will assume you want to use one passphrase only.\n\n\tSource must be one of `prompt`, `pass`, `env`, `file` or `stdin`. For `pass`, `env` and `file` a corresponding identifier must also be provided.\n\n\tExamples:\n\t- --second-passphrase prompt (to force a prompt even when a second passphrase is not always necessary)\n\t- --second-passphrase \'pass:my second secret passphrase\' (should only be used where security is not important)\n\t- --second-passphrase env:SECOND_SECRET_PASSPHRASE\n\t- --second-passphrase file:/path/to/my/secondPassphrase.txt (takes the first line only)\n\t- --second-passphrase stdin (takes one line only)\n';

var passwordDescription = 'Specifies a source for your secret password. Lisk Commander will prompt you for input if this option is not set.\n\n\tSource must be one of `prompt`, `pass`, `env`, `file` or `stdin`. For `pass`, `env` and `file` a corresponding identifier must also be provided.\n\n\tExamples:\n\t- --password prompt (default behaviour)\n\t- --password pass:password123 (should only be used where security is not important)\n\t- --password env:PASSWORD\n\t- --password file:/path/to/my/password.txt (takes the first line only)\n\t- --password stdin (takes the first line only)\n';

var prettyDescription = 'Prints JSON in pretty format rather than condensed. Has no effect if the output is set to table. You can change the default behaviour in your config.json file.';

var tableDescription = 'Prints output in table format (default). You can change the default behaviour in your config.json file.';

var votesDescription = 'Specifies the public keys for the delegate candidates you want to vote for. Takes either a string of public keys separated by commas, or a path to a file which contains the public keys.\n\n\tExamples:\n\t- --votes publickey1,publickey2\n\t- --votes file:/path/to/my/votes.txt (every public key should be on a new line)\n';

var unvotesDescription = 'Specifies the public keys for the delegate candidates you want to remove your vote from. Takes either a string of public keys separated by commas, or a path to a file which contains the public keys.\n\n\tExamples:\n\t- --unvotes publickey1,publickey2\n\t- --unvotes file:/path/to/my/unvotes.txt (every public key should be on a new line)\n';

var noSignatureDescription = 'Creates the transaction without a signature. Your passphrase will therefore not be required.';

var options = {
	json: ['-j, --json', jsonDescription],
	message: ['-m, --message <source>', messageDescription],
	noSignature: ['--no-signature', noSignatureDescription],
	passphrase: ['-p, --passphrase <source>', passphraseDescription],
	secondPassphrase: ['-s, --second-passphrase <source>', secondPassphraseDescription],
	password: ['-w, --password <source>', passwordDescription],
	pretty: ['--pretty', prettyDescription],
	table: ['-t, --table', tableDescription],
	unvotes: ['--unvotes <source...>', unvotesDescription],
	votes: ['--votes <source...>', votesDescription]
};

exports.default = options;