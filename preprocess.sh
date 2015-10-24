# 将小说中的标点符号，换行符删掉
sed 's/[，“”？。：》《……！； ’‘ ·（）()、-*.]//g' data.txt | sed '/^$/d'  | tr -t "\n" " " data_1.txt
sed 's/[，“”？。：》《……！； ’‘ ·（）()、-*.]//g' data.txt | sed '/^$/d' | tr -t "\n" " " data_1.txt
 awk 'BEGIN{ print "insert into table test1(data) values "} { for(i = 0; i < length($0); i += 150) print "(\"" substr($0, i, 150) "\"),"} END{print ";"}' data_1.txt  > mysql.sql
 cat data_1.txt | tr -d "[:punct:]" | tr -d "[:space:]" | tr -d "[:alnum:]" > temp2.txt
