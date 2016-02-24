#!/usr/bin/perl
use POSIX;
use Time::HiRes qw(gettimeofday tv_interval);

if (@ARGV == 0) {
    print "SYNTAX: ./put.pl /path/to/resource file-containing-document\n";
    print "\n";
    print "EXAMPLES:\n";
    print "    ./put.pl /api/todos/56cd2cb45fee3389839dcc77 todo.json\n";
    print "\n";

    exit;
}
my $err_file = tmpnam();
my $out_file = tmpnam();

my $host=$ENV{'TODOMEAN_RESOURCE_HOST'};
if ( $host eq "") {
    print "Unable to read 'TODOMEAN_RESOURCE_HOST' from the ENV.  Did you export the env variable?\n";
    exit 0;
}

my $command="curl -k -v -X PUT -T \"$ARGV[1]\"  -H \"Content-type: application/json\" \'$host$ARGV[0]\' 1>$out_file 2>$err_file";

print STDERR "$command\n";
my $start_time = [gettimeofday];
system($command);
my $elapsed = tv_interval ($start_time);

open (ERR, $err_file);
while(<ERR>)
{
    if (/< (ETag: ".*")/) {
        print STDERR "$1\n";
    }
    if (/< (HTTP[^\r]*)\r?$/) {
        print STDERR "$1\n";
    }
}
unlink($err_file);

open (OUT, $out_file);
while(<OUT>)
{
    system("echo '$_' | python -mjson.tool \n");
    if (/^([^\r*])\r?$/) {
        print $1;
    }
}
unlink($out_file);
printf STDERR "Elapsed Time:  %12.6f\n", $elapsed;
