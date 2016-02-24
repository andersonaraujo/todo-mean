#!/usr/bin/perl
use POSIX;

if (@ARGV == 0) {
    print "SYNTAX: ./session.pl username password \n";
    print "\n";
    print "EXAMPLES:\n";
    print "    ./session.pl admin 1q2w3e4r\n";
    print "\n";

    exit;
}
my $err_file = tmpnam();
my $out_file = tmpnam();
print "\n";

my $AUTH_HOST=$ENV{'TODOMEAN_RESOURCE_HOST'};
if ( $AUTH_HOST eq "") {
    print "Unable to read 'TODOMEAN_RESOURCE_HOST' from the ENV.  Did you export the env variable?\n";
    exit 0;
}


my $command="curl  -k -v -X POST ${AUTH_HOST}/api/authenticate -d \"username=$ARGV[0]&password=$ARGV[1]\" 1>$out_file 2>$err_file";

print STDERR "$command\n";
system($command);

open (OUTPUT, $out_file);
while(<OUTPUT>)
{
    system("echo '$_' | python -mjson.tool \n");

    if (/.*"token":(".*")*/) {
        print ">>> Logged in\n";
        print "Access token \"$1\"\n";
        system("echo \"$1\" > SESSION_TOKEN");
    } else {
        print "NOT Logged in\n";
    }
}

open (ERR, $err_file);
while(<ERR>)
{
#    print "err: $_";

    if (/.* (\d+\.\d+\.\d+\.\d+).*Connection refused/) {
        print "Connection to $1 was refused.\n"
    }
}

unlink($out_file);
unlink($err_file);
