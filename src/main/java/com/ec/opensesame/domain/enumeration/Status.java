package com.ec.opensesame.domain.enumeration;

/**
 * The Status enumeration.
 */
public enum Status {
 AUTHOR, TE1, CR, SIO, ER, RO, TE2, DONE;
 private static Status[] vals = values();

 public Status getNext()
 {
     return vals[(this.ordinal()+1) % vals.length];
 }
 public static Status get(String val)
 {
   for (Status n : Status.values()) {
     if(n.name().equals(val)){
       return n;
     }
   }
   return null;
 }

}
