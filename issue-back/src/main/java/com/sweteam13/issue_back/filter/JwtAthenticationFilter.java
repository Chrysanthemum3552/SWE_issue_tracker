package com.sweteam13.issue_back.filter;

import java.io.IOException;

import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.security.authentication.event.AbstractAuthenticationEvent;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sweteam13.issue_back.provider.JwtProvider;

import org.springframework.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;


@Component
@RequiredArgsConstructor
public class JwtAthenticationFilter extends OncePerRequestFilter {
    
    private final JwtProvider jwtProvider;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        try {
            String token = parserBearerToken(request);

                if(token == null) {
                    filterChain.doFilter(request, response);
                    return;
                }

                String name=jwtProvider.validate(token);

                if(name == null) {
                    filterChain.doFilter(request, response);
                    return;
                }
                
                AbstractAuthenticationToken authenticationToken = 
                    new UsernamePasswordAuthenticationToken(name, null, Collections.emptyList());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(authenticationToken);

                SecurityContextHolder.setContext(securityContext);

        } catch(Exception e) {
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
                

    }

    private String parserBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Athorization");
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if(!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer ");
        if(!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }

}
