library(dplyr)

fueladd <- function(m){
  f<-trunc(m/3)-2
  if(f<0){f<-0}else{f<-f+fueladd(f)}
  return(f)
}

setwd(dirname(sys.frame(1)$ofile))
indata <- read.csv("input.txt", header=FALSE)
indata %>% mutate(fuel=sapply(V1, fueladd)) %>% summarize(sum(fuel))