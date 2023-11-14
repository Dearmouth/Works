#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
int main(){
	FILE *fp = NULL;

	char buff[255];
	int modnum = 0;

	int i = 0;
	char* str;

	if((fp = fopen("modoverrides.lua", "r"))  == NULL){
		printf("Cannot open file\n");
		exit(1);
	};

	FILE *out = NULL;
	out = fopen("dedicated_sever_mods_setup.lua", "w+");

	printf("file opened\n");

	while(fscanf(fp, "%s", buff) != EOF){
		
		// printf("processing: %s\n", buff);

		if((str = strstr(buff, "\"workshop-")) != NULL){


			char number[20];
			int k = 0;

			for(i = 0; buff[i] != '\0'; i++ ){
				if(isdigit(buff[i])){
					number[k] = buff[i];
					k++;
					}

				}

			number[k] = '\0';
			printf("record a mod id: %s\n", number);
			
			modnum ++;
			fprintf(out,"ServerModSetup(\"%s\")\n",number);



			
		}


	}

	printf("The number of mods:%d\n", modnum);
	fclose(fp);
	fclose(out);

}