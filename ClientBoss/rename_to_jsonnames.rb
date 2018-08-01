require 'find'




def convert_str(str) 
    a =  str.split("/")
    a[0] = a[0] + "_json"
    "#{a[0]}.#{a[-1]}"
end

def proc_line(line) 
    if /_json./.match(line) 
        return
    end
    m = line.gsub(/source=\"((\w+)(\/*))+\"/,).to_a
    a = m[0].split('"')
    s =  a[-1]
    sss = convert_str(s)
    # cvstr = convert_str(a[-1].to_s)
    line.gsub!(/source=\"((\w+)(\/*))+\"/,"source=\"#{sss}\"")

end

def proc_code_line(line) 
    if /_json./.match(line) 
        return
    end
    m = line.gsub(/icon = \"((\w+)(\/*))+\"/,).to_a
    a = m[0].split('"')
    s =  a[-1]
    sss = convert_str(s)
    # cvstr = convert_str(a[-1].to_s)
    line.gsub!(/icon = \"((\w+)(\/*))+\"/,"icon = \"#{sss}\"")
end
def proc_code_line2(line) 
    if /_json./.match(line) 
        return
    end
    m = line.gsub(/source = \"((\w+)(\/*))+\"/,).to_a
    a = m[0].split('"')
    s =  a[-1]
    sss = convert_str(s)
    # cvstr = convert_str(a[-1].to_s)
    line.gsub!(/source = \"((\w+)(\/*))+\"/,"source = \"#{sss}\"")
end

# 替换 source = 项
def replace_exml(path)
    puts path
    File.open(path,'r+') do |f|
        f.each do |line|
            
           
            if line =~ /\bsource=\"*\"\b/
                oripos = f.tell()
                puts "lineA\t\t\t\t" + line
                # puts "lineB\t\t\t\t" + f.readline()
                pline = proc_line(line)
                puts "lineC\t\t\t\t" + line
                puts "后来位置： " + f.tell().to_s
                puts "lineE\t\t\t\t" + f.readline().to_s
            end
        end
    end
end

# 替换icon = 资源项
def replace_ts(path)
    File.open(path,'r+') do |f|
        f.each do |line|
 
            if line =~ /\bicon = \"*\"\b/
                f.seek(-line.length,IO::SEEK_CUR)
                puts f.tell()
                # puts line
                pline = proc_code_line(line)
                
                f.write(pline)
            elsif line =~ /\bsource =\"*\"\b/
                f.seek(-line.length,IO::SEEK_CUR)
                # puts line
                pline = proc_code_line2(line)
                
                f.write(pline)
            end
        end
    end
end

Find.find('.') do |path|
    names =  File.basename(path).split('.')
    if names[-1] == 'ts'
        # replace_ts(path)
    elsif names[-1] == 'exml'
        replace_exml(path)
    end
end